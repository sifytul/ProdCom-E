import Image from "next/image";

type TProps = {
  children: React.ReactNode;
};

const Auth = ({ children }: TProps) => {
  return (
    <div className="max-w-screen-2xl mx-auto md:grid md:grid-cols-2 grid-col items-center h-screen">
      {/* left  section*/}
      <div className="bg-neutral-white-dark md:h-screen h-[40%] w-full relative">
        {/* <h1 className="text-2xl absolute italic font-semibold text-primary ">
          ProdCom-E
        </h1>  */}
        <Image
          src={"/assets/images/sofa.svg"}
          width={500}
          height={500}
          alt="picture of the sofa"
          style={{
            objectFit: "contain",
            height: "100%",
            width: "100%",
          }}
        />
      </div>

      {/* right section  */}

      <div className="max-w-[460px] min-w-[380px] mx-auto p-4 sm:p-8">
        <>{children}</>
      </div>
    </div>
  );
};

export default Auth;
