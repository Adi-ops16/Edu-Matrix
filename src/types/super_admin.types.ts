export interface OverviewResponse {
  institutions: {
    total: number;
    active: number;
    pending: number;
    growthThisMonth: number;
  };
  users: {
    totalStudents: number;
    totalTeachers: number;
    newStudentsThisMonth: number;
  };
  academics: {
    totalDepartments: number;
    totalCourseBlueprints: number;
    ongoingCourseSections: number;
    totalStudentEnrollments: number;
  };
  financials: {
    totalRevenue: number;
    revenueThisMonth: number;
    currency: string;
  };
  generatedAt: string;
}
