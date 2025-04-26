let users = [
	{
		id: 1,
		first_name: 'Lorilee',
		last_name: 'Adame',
		email: 'ladame0@guardian.co.uk',
		password: '12345678',
	},
	{
		id: 2,
		first_name: 'Gannon',
		last_name: 'Manwell',
		email: 'gmanwell1@naver.com',
		password: '12345678',
	},
	{
		id: 3,
		first_name: 'Christiana',
		last_name: 'Dowtry',
		email: 'cdowtry2@mapy.cz',
		password: '12345678',
	},
	{
		id: 4,
		first_name: 'Warden',
		last_name: 'Ansteys',
		email: 'wansteys3@yahoo.com',
		password: '12345678',
	},
	{
		id: 5,
		first_name: 'Claybourne',
		last_name: 'Barbosa',
		email: 'cbarbosa4@si.edu',
		password: '12345678',
	},
	{
		id: 6,
		first_name: 'Zita',
		last_name: 'Triner',
		email: 'ztriner5@youku.com',
		password: '12345678',
	},
	{
		id: 7,
		first_name: 'Orsa',
		last_name: 'Pilcher',
		email: 'opilcher6@surveymonkey.com',
		password: '12345678',
	},
	{
		id: 8,
		first_name: 'Lyn',
		last_name: 'Fockes',
		email: 'lfockes7@answers.com',
		password: '12345678',
	},
	{
		id: 9,
		first_name: 'Harv',
		last_name: 'Olifaunt',
		email: 'holifaunt8@jalbum.net',
		password: '12345678',
	},
	{
		id: 10,
		first_name: 'Nikita',
		last_name: 'Duncanson',
		email: 'nduncanson9@harvard.edu',
		password: '12345678',
	},
];

function login(email, password) {
	if (!email || !password) {
		alert("Hãy nhập đầy đủ thông tin");
		return;
	}

	const user = users.find(u => u.email === email && u.password === password);
	if (user) {
		alert(`Xin chào ${user.first_name} ${user.last_name}`);
		localStorage.setItem('currentUser', JSON.stringify(user));
	} else {
		alert("Thông tin tài khoản không chính xác");
	}
}


function register(first_name, last_name, email, password) {
	if (!first_name || !last_name || !email || !password) {
		alert("Hãy nhập đầy đủ thông tin");
		return;
	}

	const existingUser = users.find(u => u.email === email);
	if (existingUser) {
		alert("Email này đã có tài khoản");
	} else {
		const newId = Math.max(...users.map(u => u.id)) + 1;
		const newUser = { id: newId, first_name, last_name, email, password };
		users.push(newUser);
		alert(`Đăng ký thành công! Chào mừng ${first_name} ${last_name}`);
		localStorage.setItem('currentUser', JSON.stringify(newUser));
	}
}


function searchUsers(keyword = "") {
	let filteredUsers;

	if (!keyword) {
		filteredUsers = users;
	} else {
		const lowercaseKeyword = keyword.toLowerCase();
		filteredUsers = users.filter(u => {
			const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
			const email = u.email.toLowerCase();
			return fullName.includes(lowercaseKeyword) || email.includes(lowercaseKeyword);
		});
	}

	if (filteredUsers.length === 0) {
		alert("Không tìm thấy user nào khớp với keyword");
	} else {
		const result = filteredUsers.map(u =>
			`ID: ${u.id}, Họ và tên: ${u.first_name} ${u.last_name}, Email: ${u.email}`
		).join('\n');
		alert("Danh sách users:\n" + result);
	}
}


document.addEventListener('DOMContentLoaded', function () {
	const loginButton = document.querySelector('.btn-login');
	if (loginButton) {
		const emailInput = document.getElementById('loginEmail');
		const passwordInput = document.getElementById('loginPassword');
		loginButton.addEventListener('click', () => {
			login(emailInput.value.trim(), passwordInput.value.trim());
		});
	}

	const createButton = document.querySelector('.btn-creat-account');
	if (createButton) {
		const firstNameInput = document.getElementById('firstName');
		const lastNameInput = document.getElementById('lastName');
		const emailInput = document.getElementById('loginEmail');
		const passwordInput = document.getElementById('loginPassword');
		createButton.addEventListener('click', () => {
			register(
				firstNameInput.value.trim(),
				lastNameInput.value.trim(),
				emailInput.value.trim(),
				passwordInput.value.trim()
			);
		});
	}
});