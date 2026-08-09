# Ecom K8s Manifests

## Apply order

```bash
kubectl apply -f namespace.yaml
kubectl apply -f secrets.yaml
kubectl apply -f configmap.yaml
kubectl apply -f postgres-statefulset.yaml
kubectl apply -f redis-statefulset.yaml
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml
kubectl apply -f app-hpa.yaml
kubectl apply -f frontend-configmap.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f frontend-hpa.yaml
kubectl apply -f ingress.yaml
```

Ingress is applied last since it references both the `ecom-api` and
`ecom-frontend` Services, which need to exist first.

`pvc.yaml` is **not applied separately** — the StatefulSets (04, 05) use
`volumeClaimTemplates`, which auto-provision and bind their own PVCs per
replica. That's the standard, recommended pattern for StatefulSets, so
`pvc.yaml` is included only as a reference for storage sizing if you'd
rather manage PVCs independently (e.g. for a non-StatefulSet use case later).

## Assumptions you need to verify/change before applying

1. **Container image** — `app-deployment.yaml` uses a placeholder
   `your-registry/ecom-api:latest`. Replace with your actual built/pushed
   image (ECR, Docker Hub, GCR, etc.) and a real tag — avoid `latest` in
   production, pin to a commit SHA or semver tag for safe rollbacks.
2. **Health check route** — probes hit `/api/v1/health`. If you don't have
   this endpoint yet, add a simple one (200 OK, checks DB/Redis
   reachability) before deploying, or the pods will never become Ready.
3. **Domain names** — `ingress.yaml` now routes two hosts:
   `api.yourdomain.com` → backend, `www.yourdomain.com` → frontend.
   Replace both with your real domains. If you'd rather serve both under
   one domain with path-based routing (e.g. `/api` → backend, `/` →
   frontend) instead of separate subdomains, that's a valid alternative —
   just note NestJS's global route prefix and Next.js's routing would
   both need to agree on the `/api` prefix stripping, which is more
   fragile than the subdomain approach used here.
4. **Frontend image** — `frontend-deployment.yaml` uses a placeholder
   `your-registry/ecom-frontend:latest`. Build your Next.js app in
   standalone output mode (`output: 'standalone'` in `next.config.js`)
   for the smallest, fastest-starting Docker image.
5. **NEXT_PUBLIC_API_URL** — set in `frontend-configmap.yaml`. This
   must be the **public** API URL (what the user's browser calls), not
   the internal `ecom-api` ClusterIP service name — Next.js bakes
   `NEXT_PUBLIC_*` vars into the client-side JS bundle at build time in
   most setups, so double check whether you're setting this at build time
   (Docker build arg) or runtime (env var) depending on how your
   Dockerfile is set up; a mismatch here is a common source of "frontend
   can't reach API" bugs after deploying.
6. **Ingress controller** — assumes `nginx-ingress` is installed in the
   cluster (`ingressClassName: nginx`). If you're on a managed cloud (EKS/
   GKE/AKS) you may instead be using ALB/GCE/Azure ingress controllers —
   the annotations and `ingressClassName` differ.
7. **cert-manager** — the `cert-manager.io/cluster-issuer` annotation
   assumes cert-manager is installed for automatic TLS certs. Remove that
   annotation and the `tls:` block if you're handling TLS another way
   (e.g. terminating at a cloud load balancer instead).
8. **metrics-server** — the HPA (08) requires `metrics-server` running in
   the cluster to read CPU/memory metrics. Most managed clusters have this
   by default; self-managed clusters may need `kubectl apply` for it
   separately.
9. **Storage class** — `storageClassName` is commented out in the PVC
   templates, meaning it'll use your cluster's default StorageClass. Set
   it explicitly (e.g. `gp3` on EKS, `standard` on GKE) if you need a
   specific one.
10. **Secrets** — `secrets.yaml` has plaintext placeholder passwords.
    Do not commit real values to git. Use `kubectl create secret` directly,
    or better, a proper secrets manager (Sealed Secrets, External Secrets
    Operator, AWS/GCP Secrets Manager) for anything beyond local/dev
    clusters.

## Notes on what's wired in

- **Zero-downtime rolling deploys**: `maxUnavailable: 0` on the Deployment
  ensures old pods aren't killed until new ones are Ready.
- **Init containers** wait for Postgres and Redis TCP ports to be open
  before the app container starts — prevents crash-loop-on-boot during
  first deploy or Redis/Postgres pod restarts.
- **HPA** scales 2–10 replicas on CPU (70%) or memory (80%) utilization,
  with fast scale-up and a 5-minute stabilization window on scale-down to
  avoid flapping under bursty traffic (relevant given your rate
  limiting/flash-sale work).
- **Headless services** (`clusterIP: None`) on Postgres/Redis are required
  for StatefulSet stable network identity — this is what gives you
  `postgres-0.postgres.ecom.svc.cluster.local`-style addressing if you
  ever move to multi-replica Postgres/Redis (e.g. read replicas).

## Not included (worth doing next)

- **NetworkPolicy** — currently any pod in the namespace can reach
  Postgres/Redis. Worth restricting to only `ecom-api` pods.
- **PodDisruptionBudget** — prevents voluntary disruptions (node drains,
  cluster upgrades) from taking down all app replicas at once.
- **Resource quotas / LimitRange** at the namespace level.
- **Postgres backup strategy** — a single-replica StatefulSet with a PVC
  is not a backup. Consider `pg_dump` CronJobs to object storage, or a
  managed Postgres (RDS/Cloud SQL) instead for production.
