import InstitutionTeachersSheet from "@/components/modules/institution/institution.teachers/InstitutionTeachersSheet";
import InstitutionStudentsDetailsSheet from "@/components/modules/institution/institution-students/InstitutionStudentsDetailsSheet";
import type { DepartmentStudents, DepartmentTeachers } from "@/types";

type Props =
  | { role: "STUDENT"; student: DepartmentStudents }
  | { role: "TEACHER"; teacher: DepartmentTeachers };

export default function DepartmentMembersSheet(props: Props) {
  if (props.role === "STUDENT") {
    return <InstitutionStudentsDetailsSheet user={props.student} />;
  }

  return <InstitutionTeachersSheet teacher={props.teacher} />;
}
