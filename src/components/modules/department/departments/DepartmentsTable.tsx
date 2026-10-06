import { IconEdit, IconPlusFilled } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Department } from "@/types";

export default function DepartmentsTable({
  departments,
  refetch,
  setDepartmentToUpdate,
  setDescriptionDepartment,
  setJoinDepartment,
}: {
  departments: Department[] | null;
  refetch: () => void;
  setDescriptionDepartment: Dispatch<SetStateAction<Department | null>>;
  setDepartmentToUpdate?: Dispatch<SetStateAction<Department | null>>;
  setJoinDepartment?: Dispatch<SetStateAction<Department | null>>;
}) {
  if (departments?.length === 0) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-32 text-center text-muted-foreground"
            >
              No departments have been created yet.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  if (!departments) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-32 text-center text-muted-foreground"
            >
              Couldn't load department data.
              <Button onClick={refetch} size={"lg"}>
                Try again
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="min-w-48">Name</TableHead>
            <TableHead className="min-w-28">Code</TableHead>
            <TableHead className="min-w-32">Established</TableHead>
            <TableHead className="min-w-72">Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department) => {
            const words = department.department_description
              .trim()
              .split(/\s+/)
              .filter(Boolean);
            const isLongDescription = words.length > 30;
            const descriptionPreview = isLongDescription
              ? `${words.slice(0, 30).join(" ")}...`
              : department.department_description || "Not provided";

            return (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>
                  <span className="rounded bg-muted px-2 py-1 font-mono text-xs">
                    {department.code}
                  </span>
                </TableCell>
                <TableCell>{department.department_established_year}</TableCell>
                <TableCell className="max-w-xl whitespace-normal">
                  <p className="min-w-0 whitespace-pre-wrap wrap-break-word">
                    {descriptionPreview}
                    {isLongDescription && (
                      <Button
                        size={"xs"}
                        variant={"ghost"}
                        className={"py-0 underline"}
                        aria-label={`View full description for ${department.name}`}
                        title="View full description"
                        onClick={() => setDescriptionDepartment(department)}
                      >
                        View
                      </Button>
                    )}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  {setDepartmentToUpdate && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDepartmentToUpdate(department)}
                    >
                      <IconEdit aria-hidden="true" />
                      Update
                    </Button>
                  )}
                  {setJoinDepartment && (
                    <Button
                      onClick={() => setJoinDepartment(department)}
                      type="button"
                      variant="outline"
                      size="sm"
                    >
                      <IconPlusFilled aria-hidden="true" />
                      Join
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
