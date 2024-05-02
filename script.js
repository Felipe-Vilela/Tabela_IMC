function verificaDados(nome, peso, altura) {
	if (peso <= 0 || altura <= 0 || nome === "") {
			return false;
	} else {
			return true;
	}
}

function atualizarTabela() {
	const url = "https://ifsp.ddns.net/webservices/imc/pessoa";
	
	fetch(url)
	.then((resposta) => {
					if (!resposta.ok) {
							throw new Error("Falha ao carregar os dados.");
					}
					return resposta.json();
	})
	.then((dados) => {
		const tbody = document.querySelector("#corpo-tabela");
		limparTabela() 
		
		for (let pessoa of dados) {
			let trPessoa = document.createElement("tr");
			let tdNome = document.createElement("td");
			let tdAltura = document.createElement("td");
			let tdPeso = document.createElement("td");
			let tdImc = document.createElement("td");
			let tdStatus = document.createElement("td");
			let tdOpcao = document.createElement("td");

			let btnMenosPeso = document.createElement("button");
			let btnMaisPeso = document.createElement("button");
			let btnExcluir = document.createElement("button");

			// Adicionando Classes nos btn
			btnExcluir.classList.add("botaos_tabela_excluir");
			btnMaisPeso.classList.add("botaos_tabela", "mais_peso");
			btnMenosPeso.classList.add("botaos_tabela", "menos_peso");

			// Insere os botões das opções na tabela
			btnMaisPeso.innerText = "+ Peso";
			btnMenosPeso.innerText = "- Peso";
			btnExcluir.innerText = "Excluir";

			tdOpcao.append(btnMaisPeso);
			tdOpcao.append(btnMenosPeso);
			tdOpcao.append(btnExcluir);

			tdNome.innerText = pessoa.nome;
			tdAltura.innerText = pessoa.altura;
			tdPeso.innerText = pessoa.peso;
			tdImc.innerText = pessoa.imc;
			tdStatus.innerText = pessoa.status;

			trPessoa.append(tdNome);
			trPessoa.append(tdAltura);
			trPessoa.append(tdPeso);
			trPessoa.append(tdImc);
			trPessoa.append(tdStatus);
			trPessoa.append(tdOpcao);

			tbody.appendChild(trPessoa); // Adiciona a linha à tabela

			addEventoMaisPeso(btnMaisPeso, pessoa.id, pessoa.peso);
			addEventoMenosPeso(btnMenosPeso, pessoa.id, pessoa.peso);
			addEventoExcluirLinha(btnExcluir, pessoa.id)

		}
	})
	.catch(error => {
			console.error("Error: " + error);
	});
}

function limparTabela() {
	const tbody = document.querySelector('#corpo-tabela');
	tbody.innerHTML = ''; // Limpa o conteúdo do tbody
}

//Cadastrar - Adicionar nova pessoa no webservice
function adicionarPessoa() {
	//Pega os valores do formulário
	let nome = document.querySelector("#nome").value;
	let altura = document.querySelector("#altura").value;
	let peso = document.querySelector("#peso").value;


	if (verificaDados(nome, peso, altura)) {
		const url = "https://ifsp.ddns.net/webservices/imc/pessoa";
		let options = {
				method: "POST",
				body: JSON.stringify({
						nome: nome,
						altura: altura,
						peso: peso,
				}),
				headers: {
						"Content-type": "application/json"
				}
		}
		fetch(url, options).then((resposta) => {
				if (!resposta.ok) {
					throw new Error("Falha ao adicionar pessoa.");
				}
				return resposta.json();
				})
				.then(() => {
					atualizarTabela();
					
				})
				.catch(error => console.error("Error:" + error));
		return true
	} 
	else {
		alert("Há campos vazios ou dados inválidos. Peso e Altura precisam ser maiores que 0.");
	}
	
};

function addEventoMaisPeso(btnMaisPeso, idPessoa, pesoPessoa) {
	btnMaisPeso.addEventListener("click", () => {
		const url = "https://ifsp.ddns.net/webservices/imc/pessoa/" + idPessoa;
		let novoPeso = parseFloat(pesoPessoa + 0.5);
		let options = {
			method: "PUT",
			body: JSON.stringify({
				peso: novoPeso,								
			}),
			headers: {
				"Content-type": "application/json"
			}
		}

		fetch(url, options)
		.then((resposta) => {
			if (!resposta.ok) {
				throw new Error("Falha ao carregar os dados.");
			}
			return resposta.json();
		})
		.then((dados) => {
			atualizarTabela();
		})
		.catch(error => {
			console.error("Error: " + error);
		});
	});	
}


function addEventoMenosPeso(btnMenosPeso, idPessoa, pesoPessoa) {
	btnMenosPeso.addEventListener("click", () => {
		const url = "https://ifsp.ddns.net/webservices/imc/pessoa/" + idPessoa;
		if (pesoPessoa > 0.5) {
			let novoPeso = parseFloat(pesoPessoa - 0.5);
	
			let options = {
				method: "PUT",
				body: JSON.stringify({
					peso: novoPeso,								
				}),
				headers: {
					"Content-type": "application/json"
				}
			}
	
			fetch(url, options)
			.then((resposta) => {
				if (!resposta.ok) {
					throw new Error("Falha ao carregar os dados.");
				}
				return resposta.json();
			})
			.then((dados) => {
				atualizarTabela();
			})
			.catch(error => {
				console.error("Error: " + error);
			});
		}else{
			alert("Não foi possível remover devido ao peso já estar no mínimo.")
		}
	});	
}


function addEventoExcluirLinha(btnExcluir, idPessoa) {
	btnExcluir.addEventListener("click", () => {
		const url = "https://ifsp.ddns.net/webservices/imc/pessoa/" + idPessoa;

		fetch(url, {
			method: "DELETE",
			
		}).then((resposta) => {
			if (!resposta.ok) {
				throw new Error("Falha ao carregar os dados.");
			}
			return resposta.json();
		})
		.then((dados) => {
			atualizarTabela();
		})
		.catch(error => {
			console.error("Error: " + error);
		});
	});	
}

function addRemoverMaiorImc(){
	const url = "https://ifsp.ddns.net/webservices/imc/pessoa";
	let maiorImc;
	let idMaiorImc;
	
	fetch(url)
	.then((resposta) => {
			if (!resposta.ok) {
					throw new Error("Falha ao carregar os dados.");
			}
			return resposta.json();
	})
	.then((dados) => {
		maiorImc = dados[0].imc;
		idMaiorImc = dados[0].id;
		for (let pessoa of dados) {
			if (maiorImc < pessoa.imc) {
				maiorImc = pessoa.imc
				idMaiorImc = pessoa.id
			}
		}
		addEventoExcluir(idMaiorImc)
	}		
	)
	.catch(error => {
			console.error("Error: " + error);
	});
}


function addRemoverMenorImc(){
	const url = "https://ifsp.ddns.net/webservices/imc/pessoa";
	let menorImc;
	let idMenorImc;
	
	fetch(url)
	.then((resposta) => {
			if (!resposta.ok) {
					throw new Error("Falha ao carregar os dados.");
			}
			return resposta.json();
	})
	.then((dados) => {
		menorImc = dados[0].imc;
		idMenorImc = dados[0].id;
		for (let pessoa of dados) {
			if (menorImc > pessoa.imc) {
				menorImc = pessoa.imc
				idMenorImc = pessoa.id
			}
		}
		addEventoExcluir(idMenorImc)
	}		
	)
	.catch(error => {
			console.error("Error: " + error);
	});
}


function addEventoExcluir(idPessoa) {
		const url = "https://ifsp.ddns.net/webservices/imc/pessoa/" + idPessoa;

		fetch(url, {
			method: "DELETE",
			
		}).then((resposta) => {
			if (!resposta.ok) {
				throw new Error("Falha ao carregar os dados.");
			}
			return resposta.json();
		})
		.then((dados) => {
			atualizarTabela();
		})
		.catch(error => {
			console.error("Error: " + error);
		});
}

function main() {
	atualizarTabela();

	let btnPost = document.querySelector("#post");
	btnPost.addEventListener("click", (e) => {
		if(adicionarPessoa()){
			// Limpa formulário
			formulario = document.querySelector("#cadastro-form")
			formulario.reset();
			e.preventDefault();
		}
})

	let btnMaiorImc = document.querySelector("#btnRemoverMaiorImc");
	let btnMenorImc = document.querySelector("#btnRemoverMenorImc");

	btnMaiorImc.addEventListener("click", () => {
		addRemoverMaiorImc()
		
	})

	btnMenorImc.addEventListener("click", () => {
		addRemoverMenorImc()
	})

}


main();

