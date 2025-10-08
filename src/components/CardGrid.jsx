import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

const CardGrid = ({ onCardClick }) => {
  const [selected, setSelected] = useState(null);

  const options = [
    {
      id: 1,
      title: "Daily",
      description: "Pickup every day",
      amount: "₦300",
    },
    {
      id: 2,
      title: "Weekly",
      description: "Pickup once a week",
      amount: "₦2800",
    },
    {
      id: 3,
      title: "Biweekly",
      description: "Pickup every 2 weeks",
      amount: "₦3400",
    },
    {
      id: 4,
      title: "Monthly",
      description: "Pickup once a month",
      amount: "₦4200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mt-4 w-full">
      {options.map((option) => (
        <Card
          key={option.id}
          onClick={() => {
            setSelected(option.id);
            if (onCardClick) onCardClick(option);
          }}
          className={`cursor-pointer transition-transform transform hover:scale-105 w-full h-auto sm:w-72 sm:h-38 ${
            selected === option.id
              ? "border-green-500 shadow-lg"
              : "border-gray-200"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-lg">{option.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{option.description}</p>
            <p className="text-sm font-semibold">{option.amount}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardGrid;
