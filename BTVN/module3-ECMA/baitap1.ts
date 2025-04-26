// Class đại diện cho tài khoản ngân hàng
class BankAccount {
  constructor(
    public accountNumber: number,
    public accountHolder: string,
    public balance: number = 0
  ) { }
}

// Interface định nghĩa các phương thức quản lý tài khoản ngân hàng
interface IBankAccountManager {
  createAccount(account: BankAccount): void;
  closeAccount(accountNumber: number): void;
  getAccountByNumber(accountNumber: number): BankAccount | undefined;
  listAllAccounts(): BankAccount[];
  deposit(accountNumber: number, amount: number): void;
  withdraw(accountNumber: number, amount: number): void;
  getAccountHolderAndBalance(accountNumber: number): Pick<BankAccount, 'accountHolder' | 'balance'> | undefined;
  getAccountWithoutBalance(accountNumber: number): Omit<BankAccount, 'balance'> | undefined;
  updateAccount(accountNumber: number, updatedInfo: Partial<BankAccount>): void;
}

// Class triển khai quản lý tài khoản ngân hàng
class BankAccountManager implements IBankAccountManager {
  private accounts: BankAccount[] = [];

  // Tạo tài khoản mới và thêm vào danh sách
  createAccount(account: BankAccount): void {
    if (this.accounts.some(acc => acc.accountNumber === account.accountNumber)) {
      throw new Error(`Tài khoản số ${account.accountNumber} đã tồn tại!`);
    }
    this.accounts.push(account);
    console.log(`Tạo tài khoản số ${account.accountNumber} thành công!`);
  }

  // Đóng tài khoản bằng cách xóa khỏi danh sách
  closeAccount(accountNumber: number): void {
    const index = this.accounts.findIndex(acc => acc.accountNumber === accountNumber);
    if (index === -1) {
      throw new Error(`Tài khoản số ${accountNumber} không tồn tại!`);
    }
    this.accounts.splice(index, 1);
    console.log(`Đóng tài khoản số ${accountNumber} thành công!`);
  }

  // Lấy thông tin tài khoản theo số tài khoản
  getAccountByNumber(accountNumber: number): BankAccount | undefined {
    return this.accounts.find(acc => acc.accountNumber === accountNumber);
  }

  // Liệt kê tất cả tài khoản
  listAllAccounts(): BankAccount[] {
    return this.accounts;
  }

  // Nạp tiền vào tài khoản
  deposit(accountNumber: number, amount: number): void {
    if (amount <= 0) {
      throw new Error("Số tiền nạp phải lớn hơn 0!");
    }
    const account = this.getAccountByNumber(accountNumber);
    if (!account) {
      throw new Error(`Tài khoản số ${accountNumber} không tồn tại!`);
    }
    account.balance += amount;
    console.log(`Nạp ${amount} vào tài khoản ${accountNumber}. Số dư mới: ${account.balance}`);
  }

  // Rút tiền từ tài khoản
  withdraw(accountNumber: number, amount: number): void {
    if (amount <= 0) {
      throw new Error("Số tiền rút phải lớn hơn 0!");
    }
    const account = this.getAccountByNumber(accountNumber);
    if (!account) {
      throw new Error(`Tài khoản số ${accountNumber} không tồn tại!`);
    }
    if (account.balance < amount) {
      throw new Error("Số dư không đủ để rút!");
    }
    account.balance -= amount;
    console.log(`Rút ${amount} từ tài khoản ${accountNumber}. Số dư mới: ${account.balance}`);
  }

  // Lấy thông tin tên chủ tài khoản và số dư
  getAccountHolderAndBalance(accountNumber: number): Pick<BankAccount, 'accountHolder' | 'balance'> | undefined {
    const account = this.getAccountByNumber(accountNumber);
    if (!account) {
      return undefined;
    }
    return { accountHolder: account.accountHolder, balance: account.balance };
  }

  // Lấy thông tin tài khoản không bao gồm số dư
  getAccountWithoutBalance(accountNumber: number): Omit<BankAccount, 'balance'> | undefined {
    const account = this.getAccountByNumber(accountNumber);
    if (!account) {
      return undefined;
    }
    return { accountNumber: account.accountNumber, accountHolder: account.accountHolder };
  }

  // Cập nhật thông tin tài khoản
  updateAccount(accountNumber: number, updatedInfo: Partial<BankAccount>): void {
    const account = this.getAccountByNumber(accountNumber);
    if (!account) {
      throw new Error(`Tài khoản số ${accountNumber} không tồn tại!`);
    }
    Object.assign(account, updatedInfo);
    console.log(`Cập nhật tài khoản số ${accountNumber} thành công!`);
  }
}

// Ví dụ sử dụng
const bankManager = new BankAccountManager();

try {
  // Tạo tài khoản
  bankManager.createAccount(new BankAccount(1001, "Nguyen Van A"));
  bankManager.createAccount(new BankAccount(1002, "Tran Thi B"));

  // Nạp tiền
  bankManager.deposit(1001, 500000);
  bankManager.deposit(1002, 1000000);

  // Rút tiền
  bankManager.withdraw(1001, 200000);

  // Cập nhật thông tin
  bankManager.updateAccount(1001, { accountHolder: "Nguyen Van A Updated" });

  // Lấy thông tin
  console.log("Thông tin tài khoản 1001:", bankManager.getAccountByNumber(1001));
  console.log("Tên và số dư tài khoản 1001:", bankManager.getAccountHolderAndBalance(1001));
  console.log("Thông tin tài khoản 1001 không có số dư:", bankManager.getAccountWithoutBalance(1001));

  // Liệt kê tất cả tài khoản
  console.log("Danh sách tài khoản:", bankManager.listAllAccounts());

  // Đóng tài khoản
  bankManager.closeAccount(1002);
  console.log("Danh sách tài khoản sau khi đóng:", bankManager.listAllAccounts());
} catch (error) {
  console.error("Lỗi:", (error as Error).message);
}