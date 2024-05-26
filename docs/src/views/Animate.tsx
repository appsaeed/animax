import { Motions, createAnimate, motions } from "animax";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Select from "../components/Select";

type FormProps = {
  motion?: Motions;
  infinite?: boolean;
  once?: boolean;
  duration?: number;
};
export default function Animate() {
  const element = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormProps>({
    motion: "lightSpeedIn",
    infinite: false,
    duration: 1,
    once: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setDate(name: keyof typeof form, value: any) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  useEffect(() => {
    const aninax = createAnimate({
      element: element.current as unknown as HTMLElement,
      motion: form.motion,
      once: form.once,
      infinite: form.infinite,
      duration: `${form.duration}s`,
    });
    return () => {
      aninax.cleanup();
    };
  }, [form]);

  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <Label>Select a motion</Label>
          <Select
            defaultValue={form.motion}
            onChange={(e) => setDate("motion", e.target.value)}
          >
            <option>Choose a motion</option>
            {motions.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full">
          <Label>Animate infinite</Label>
          <Select
            defaultValue={String(form.infinite)}
            onChange={(e) => setDate("infinite", e.target.value === "true")}
          >
            <option value={"true"}>true</option>
            <option value={"false"}>false</option>
          </Select>
        </div>

        <div className="w-full">
          <Label>Animate once</Label>
          <Select
            defaultValue={String(form.once)}
            onChange={(e) => setDate("once", e.target.value === "true")}
          >
            <option value={"true"}>true</option>
            <option value={"false"}>false</option>
          </Select>
        </div>

        <div className="w-full">
          <Label>Duration</Label>
          <Input
            type="number"
            value={form.duration}
            onChange={(e) => setDate("duration", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="w-full h-svh py-20 mt-20 overflow-hidden flex justify-center">
        <div ref={element} className="mx-auto">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Animax {form.motion} effect
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
