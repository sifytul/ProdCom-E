const ContactUsCard = ({
  Icon,
  title,
  desc,
}: {
  Icon: React.FunctionComponent<{ className?: string }>;
  title: string;
  desc: string;
}) => {
  return (
    <div className="bg-white-200 md:w-[250px] flex flex-col items-center p-6">
      <Icon />
      <p className="text-sm uppercase tracking-wider text-gray-500">{title}</p>
      <p className="text-sm font-semibold text-center">{desc}</p>
    </div>
  );
};

export default ContactUsCard;
