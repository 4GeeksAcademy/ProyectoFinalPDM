const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {},
			empresa: {},
			listCompany: [],
			listSucursales: []
		},
		actions: {
			deleteCompanies: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/company/${id}`, {
						method: 'DELETE',
					});
					if (!response.ok) {
						throw new Error('Error deleting empresa');
					}
					const store = getStore();
					setStore({
						listCompany: store.listCompany.filter(emp => emp.id !== id)
					});
					console.log(`success removing company`);
				} catch (error) {
					console.error('Error removing empresa:', error);
				}
			},
			getCompanies: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/company");
					const data = await response.json();
					console.log({ data })
					setStore({
						listCompany: data
					});
				} catch (error) {
					console.error('Error fetching empresas:', error);
				}
			},
			updateCompany: async (newCompany) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/company/${newCompany.id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(newCompany),
					});
					if (!response.ok) {
						throw new Error('Error updating company');
					}
					console.log(`success updating company`);
					getActions().getCompanies();
				} catch (error) {
					console.error('Error updating company:', error);
				}
			},
			createCompany: async (name, nif) => {
				const store = getStore();
				try {
					let user_id = store.user.id;
					let company_is_active = store.user.is_active;
					const response = await fetch(process.env.BACKEND_URL + "/api/company", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ nif, company_is_active, name, user_id }),
					});
					const data = await response.json();
					setStore({
						empresa: data.company,
						listCompany: [...store.listCompany, data.company]
					});
					console.log(`succes creating company.`);
				} catch (error) {
					console.error('Error creating company:', error);
				}
			},
			getSucursales: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/branch");
					if (!response.ok) throw new Error('Error al obtener sucursales');
					const data = await response.json();
					setStore({ listSucursales: data });
				} catch (error) {
					console.error('Error al obtener sucursales:', error);
				}
			},
			deleteSucursales: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/branch/${id}`, {
						method: 'DELETE',
					});
					if (!response.ok) throw new Error('Error al eliminar sucursal');
					setStore({
						listSucursales: store.listSucursales.filter(suc => suc.id !== id)
					});
				} catch (error) {
					console.error('Error al eliminar sucursal:', error);
				}
			},
			createSucursal: async (name, address, phone) => {
				const store = getStore();
				if (!store?.user?.id)
					console.error("no hay usuario en la store")
				try {
					let user_id = store?.user?.id
					if (!user_id) console.error("falta el user_id");
					let branch_is_active = store?.user?.is_active;
					if (!branch_is_active) console.error("falta el branch_is_active");
					const response = await fetch(process.env.BACKEND_URL + "/api/branch", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name, address, phone, branch_is_active, user_id }),
					});
					if (!response.ok) throw new Error('Error al crear sucursal');
					const data = await response.json();
					setStore({
						listSucursales: [...store.listSucursales, data]
					});
					console.log(`succes creating branch.`);
				} catch (error) {
					console.error('Error creating branch:', error);
				}
			},
			updateSucursal: async (newSucursal) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/branch/${newSucursal.id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(newSucursal),
					});
					if (!response.ok) throw new Error('Error updating branch');
					console.log(`success updating branch`);
				} catch (error) {
					console.error('Error updating branch:', error);
				}
			},
			verifyIdentity: async () => {
				let token = localStorage.getItem("token");
				const store = getStore();
				if (token) {
					try {
						const response = await fetch(process.env.BACKEND_URL + "/api/verify_identity", {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': "Bearer " + token,
							},
						});
						const data = await response.json();
						if (response.ok) {
							console.log("verified identity", data);
							setStore({
								...store, user: data.user,
							});
						} else {
							console.log(data.msg);
						}
					} catch (error) {
						console.error('Error en la solicitud:', error);
					}
				}
			},
			login: async (password, email, navigate) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					});
					const data = await response.json();
					if (response.ok) {
						localStorage.setItem('token', data.token);
						console.log(data);
						getActions().verifyIdentity();
						navigate();
					} else {
						console.log(data.msg);
					}
				} catch (error) {
					console.error('Error en la solicitud:', error);
				}
			},
			register: async (password, email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					});
					if (!response.ok) {
						throw new Error('Error en la solicitud');
					}
					const result = await response.json();
					console.log("success message", result.msg);
				} catch (error) {
					console.error('Registration Error:', error);
				}
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;