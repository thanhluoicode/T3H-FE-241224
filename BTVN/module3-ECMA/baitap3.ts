// Class đại diện cho nhân viên
class Employee {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public position: string,
    public departmentId: number
  ) { }
}

// Class đại diện cho phòng ban
class Department {
  constructor(
    public id: number,
    public name: string,
    public employees: Employee[] = []
  ) { }
}

// Interface định nghĩa các phương thức quản lý nhân viên
interface IEmployeeManager {
  addEmployee(employee: Employee): void;
  removeEmployee(id: number): void;
  getEmployeeById(id: number): Employee | undefined;
  listAllEmployees(): Employee[];
  updateEmployee(id: number, updatedInfo: Partial<Employee>): void;
  getEmployeeBasicInfo(id: number): Pick<Employee, 'name' | 'position'> | undefined;
  findEmployeesByName(name: string): Employee[];
  sortEmployeesByAge(): Employee[];
}

// Interface định nghĩa các phương thức quản lý phòng ban
interface IDepartmentManager {
  addDepartment(department: Department): void;
  removeDepartment(id: number): void;
  getDepartmentById(id: number): Department | undefined;
  listAllDepartments(): Department[];
  listEmployeesInDepartment(departmentId: number): Employee[];
  moveEmployeeToDepartment(employeeId: number, departmentId: number): void;
  getDepartmentWithoutEmployees(id: number): Omit<Department, 'employees'> | undefined;
  generateDepartmentReport(departmentId: number): string;
  getDepartmentEmployeeCount(departmentId: number): number;
  getAverageEmployeeAgeInDepartment(departmentId: number): number;
}

// Class triển khai quản lý nhân viên
class EmployeeManager implements IEmployeeManager {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    if (this.employees.some(e => e.id === employee.id)) {
      throw new Error(`Nhân viên mã ${employee.id} đã tồn tại!`);
    }
    this.employees.push(employee);
    console.log(`Thêm nhân viên ${employee.name} thành công!`);
  }

  removeEmployee(id: number): void {
    const index = this.employees.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error(`Nhân viên mã ${id} không tồn tại!`);
    }
    this.employees.splice(index, 1);
    console.log(`Xóa nhân viên mã ${id} thành công!`);
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  listAllEmployees(): Employee[] {
    return this.employees;
  }

  updateEmployee(id: number, updatedInfo: Partial<Employee>): void {
    const employee = this.getEmployeeById(id);
    if (!employee) {
      throw new Error(`Nhân viên mã ${id} không tồn tại!`);
    }
    Object.assign(employee, updatedInfo);
    console.log(`Cập nhật nhân viên mã ${id} thành công!`);
  }

  getEmployeeBasicInfo(id: number): Pick<Employee, 'name' | 'position'> | undefined {
    const employee = this.getEmployeeById(id);
    if (!employee) {
      return undefined;
    }
    return { name: employee.name, position: employee.position };
  }

  findEmployeesByName(name: string): Employee[] {
    return this.employees.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
  }

  sortEmployeesByAge(): Employee[] {
    return [...this.employees].sort((a, b) => a.age - b.age);
  }
}

// Class triển khai quản lý phòng ban
class DepartmentManager implements IDepartmentManager {
  private departments: Department[] = [];

  addDepartment(department: Department): void {
    if (this.departments.some(d => d.id === department.id)) {
      throw new Error(`Phòng ban mã ${department.id} đã tồn tại!`);
    }
    this.departments.push(department);
    console.log(`Thêm phòng ban ${department.name} thành công!`);
  }

  removeDepartment(id: number): void {
    const index = this.departments.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error(`Phòng ban mã ${id} không tồn tại!`);
    }
    if (this.departments[index].employees.length > 0) {
      throw new Error(`Không thể xóa phòng ban có nhân viên!`);
    }
    this.departments.splice(index, 1);
    console.log(`Xóa phòng ban mã ${id} thành công!`);
  }

  getDepartmentById(id: number): Department | undefined {
    return this.departments.find(d => d.id === id);
  }

  listAllDepartments(): Department[] {
    return this.departments;
  }

  listEmployeesInDepartment(departmentId: number): Employee[] {
    const department = this.getDepartmentById(departmentId);
    if (!department) {
      throw new Error(`Phòng ban mã ${departmentId} không tồn tại!`);
    }
    return department.employees;
  }

  moveEmployeeToDepartment(employeeId: number, departmentId: number): void {
    const department = this.getDepartmentById(departmentId);
    if (!department) {
      throw new Error(`Phòng ban mã ${departmentId} không tồn tại!`);
    }
    const employee = this.departments
      .flatMap(d => d.employees)
      .find(e => e.id === employeeId);
    if (!employee) {
      throw new Error(`Nhân viên mã ${employeeId} không tồn tại!`);
    }
    this.departments.forEach(d => {
      d.employees = d.employees.filter(e => e.id !== employeeId);
    });
    department.employees.push(employee);
    employee.departmentId = departmentId;
    console.log(`Chuyển nhân viên ${employeeId} sang phòng ban ${departmentId} thành công!`);
  }

  getDepartmentWithoutEmployees(id: number): Omit<Department, 'employees'> | undefined {
    const department = this.getDepartmentById(id);
    if (!department) {
      return undefined;
    }
    return { id: department.id, name: department.name };
  }

  generateDepartmentReport(departmentId: number): string {
    const department = this.getDepartmentById(departmentId);
    if (!department) {
      throw new Error(`Phòng ban mã ${departmentId} không tồn tại!`);
    }
    const report = [
      `Báo cáo phòng ban: ${department.name} (ID: ${department.id})`,
      `Số lượng nhân viên: ${department.employees.length}`,
      `Danh sách nhân viên:`,
      ...department.employees.map(e => `- ${e.name} (${e.position}, ${e.age} tuổi)`)
    ];
    return report.join("\n");
  }

  getDepartmentEmployeeCount(departmentId: number): number {
    const department = this.getDepartmentById(departmentId);
    if (!department) {
      throw new Error(`Phòng ban mã ${departmentId} không tồn tại!`);
    }
    return department.employees.length;
  }

  getAverageEmployeeAgeInDepartment(departmentId: number): number {
    const department = this.getDepartmentById(departmentId);
    if (!department) {
      throw new Error(`Phòng ban mã ${departmentId} không tồn tại!`);
    }
    if (department.employees.length === 0) {
      return 0;
    }
    return department.employees.reduce((sum, e) => sum + e.age, 0) / department.employees.length;
  }
}

// Ví dụ sử dụng
const employeeManager = new EmployeeManager();
const departmentManager = new DepartmentManager();

try {
  // Thêm phòng ban
  departmentManager.addDepartment(new Department(1, "IT"));
  departmentManager.addDepartment(new Department(2, "HR"));

  // Thêm nhân viên
  employeeManager.addEmployee(new Employee(101, "Nguyen Van A", 25, "Developer", 1));
  employeeManager.addEmployee(new Employee(102, "Tran Thi B", 30, "HR Specialist", 2));

  // Gán nhân viên vào phòng ban
  departmentManager.moveEmployeeToDepartment(101, 1);
  departmentManager.moveEmployeeToDepartment(102, 2);

  // Cập nhật nhân viên
  employeeManager.updateEmployee(101, { position: "Senior Developer" });

  // Lấy thông tin
  console.log("Thông tin nhân viên 101:", employeeManager.getEmployeeById(101));
  console.log("Thông tin cơ bản nhân viên 101:", employeeManager.getEmployeeBasicInfo(101));
  console.log("Thông tin phòng ban 1 không có nhân viên:", departmentManager.getDepartmentWithoutEmployees(1));

  // Tìm kiếm và sắp xếp
  console.log("Tìm nhân viên có tên 'Nguyen':", employeeManager.findEmployeesByName("Nguyen"));
  console.log("Danh sách nhân viên sắp xếp theo tuổi:", employeeManager.sortEmployeesByAge());

  // Báo cáo và thống kê
  console.log("Báo cáo phòng ban 1:\n", departmentManager.generateDepartmentReport(1));
  console.log("Số nhân viên phòng ban 1:", departmentManager.getDepartmentEmployeeCount(1));
  console.log("Tuổi trung bình phòng ban 1:", departmentManager.getAverageEmployeeAgeInDepartment(1));

  // Liệt kê
  console.log("Danh sách phòng ban:", departmentManager.listAllDepartments());
  console.log("Danh sách nhân viên:", employeeManager.listAllEmployees());
} catch (error) {
  console.error("Lỗi:", (error as Error).message);
}