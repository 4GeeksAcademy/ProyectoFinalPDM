const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			// token: localStorage.getItem("token"),
			user: {},
			empresa: {},
			listCompany: [],
		},
		actions: {
			getCompanies: async () =>{
				try {
					const store = getStore();
					const response = await fetch(process.env.BACKEND_URL + "/api/company");
					const data = await response.json();
					console.log("getting companies", data)
					setStore({
						listCompany: data
					});

				  } catch (error) {
					console.error('Error fetching empresas:', error);
				  }
				},
			updateCompany: async (newCompany) => {
				try {
					// if (editandoEmpresaId) {
					const actions = getActions()
					const response = await fetch(process.env.BACKEND_URL + `/api/company/${newCompany.id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(newCompany),
					});
					console.log(response)
					actions.getCompanies()
					// setEmpresas(prevEmpresas =>
					// 	prevEmpresas.map(emp => emp.id === editandoEmpresaId ? { ...emp, ...nuevaEmpresa } : emp)
					// );
					// setEditandoEmpresaId(null);
					// } else {
					// 	const response = await fetch(process.env.BACKEND_URL + "/api/company", {
					// 		method: 'POST',
					// 		headers: {
					// 			'Content-Type': 'application/json',
					// 		},
					// 		body: JSON.stringify(nuevaEmpresa),
					// 	});
					// 	const addedEmpresa = await response.json();
					// 	setEmpresas(prevEmpresas => [...prevEmpresas, addedEmpresa]);
					// }

					// setNombreEmpresa('');
					// setNif('');
					// setSucursal('');
				} catch (error) {
					console.error('Error saving empresa:', error);
				}
			},
			createCompany: async (name, nif) => {
				const store = getStore();
				console.log(store.user)
				console.log(store)
				try {
					let user_id = store.user.id
					let company_is_active = store.user.is_active
					const response = await fetch(process.env.BACKEND_URL + "/api/company", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ nif: nif, company_is_active: company_is_active, name: name, user_id: user_id }),
					},
					);
					const data = await response.json();
					console.log(data)
					setStore({
						empresa: data.company,
					});
				} catch (error) {
					console.error('Error fetching empresas:', error);
				}
			},
			fetchSucursales: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/branch");
					if (!response.ok) throw new Error('Error al obtener sucursales');
					const data = await response.json();
					// setSucursales(data);
					console.log(data)
				} catch (error) {
					console.error('Error al obtener sucursales:', error);
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
							console.log("verified identity", data)
							// localStorage.setItem('token', token);
							// localStorage.setItem('user', data.user);
							setStore({
								...store, user: data.user,
							});
						} else {
							console.log(data.msg)
							//   setError(data.msg || 'Credenciales incorrectas');
						}
					} catch (error) {
						console.error('Error en la solicitud:', error);
						// setError('Hubo un problema al intentar iniciar sesión');
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
						console.log(data)
						getActions().verifyIdentity();
						// Almacena el token en localStorage (o en algún estado global)
						//   alert('Inicio de sesión exitoso');
						//   setError('');
						navigate();
					} else {
						console.log(data.msg)
						//   setError(data.msg || 'Credenciales incorrectas');
					}
				} catch (error) {
					console.error('Error en la solicitud:', error);
					// setError('Hubo un problema al intentar iniciar sesión');
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
					// setSuccessMessage(result.msg);
					console.log("success message", result.msg)
				} catch (error) {
					console.error('Registration Error:', error);
					// setError('No se pudo registrar el usuario. Inténtalo de nuevo.');
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

