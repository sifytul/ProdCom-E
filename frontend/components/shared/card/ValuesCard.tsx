type Props = {
  title: string;
  description: string;
  IconComponent?: React.FC<{ className?: string }>;
};

const ValuesCard = ({ title, description, IconComponent }: Props) => {
  return (
    <div className="lg:h-[220px] lg:min-w-[262px] h-[198px] w-min-w-[152px] font-inter bg-white-100 px-4 py-8 md:px-8 md:py-12 ">
      <div className="space-y-4">
        <div className="w-12 h-12">
          {IconComponent && <IconComponent className="text-5xl" />}
        </div>
        <div>
        <h1 className="text-sm lg:text-xl font-medium ">{title}</h1>
        <p className="text-gray text-xs lg:text-sm">{description}</p>
      </div></div>
    </div>
  );
};

export default ValuesCard;
