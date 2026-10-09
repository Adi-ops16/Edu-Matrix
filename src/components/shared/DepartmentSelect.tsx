import type { Dispatch, SetStateAction } from "react";
import type { Department } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DepartmentSelect({
  departments,
  setSelectedDepartmentId,
  activeDepartmentId,
}: {
  departments: Department[];
  setSelectedDepartmentId: Dispatch<SetStateAction<string>>;
  activeDepartmentId: string;
}) {
  return (
    <div>
      {departments.length > 0 && (
        <Select
          items={departments.map((department) => ({
            key: department.id,
            value: department.id,
            label: `${department.name} (${department.code})`,
          }))}
          value={activeDepartmentId}
          onValueChange={(value) => setSelectedDepartmentId(value ?? "")}
        >
          <SelectTrigger
            className="w-full sm:w-72"
            aria-label="Select department"
          >
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={department.id} value={department.id}>
                {department.name} ({department.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
