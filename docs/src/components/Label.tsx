import { ReactNode } from "react";

type Props = {
  name?: "name";
  children?: ReactNode;
};
export default function Label({ name = "name", children }: Props) {
  return (
    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white w-full text-center">
      {name && children}
    </label>
  );
}
