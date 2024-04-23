//FUNÇÔES
function calculoImc(peso, altura) {
	let resultado = peso / (altura * altura);

	return resultado;
}

function statusImc(resultadoCalculo) {
	let status;

	if (resultadoCalculo < 18.50) {
			status = "Magreza";
	} else if (resultadoCalculo >= 18.50 && resultadoCalculo <= 24.99) {
			status = "Saudável";
	} else if (resultadoCalculo >= 25.00 && resultadoCalculo <= 29.99) {
			status = "Sobrepeso";
	} else if (resultadoCalculo >= 30.00 && resultadoCalculo <= 34.99) {
			status = "Obesidade I";
	} else if (resultadoCalculo >= 35.00 && resultadoCalculo <= 39.99) {
			status = "Obesidade II";
	} else if (resultadoCalculo >= 40.00) {
			status = "Obesidade III";
	}

	return status
}

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
					limparTabela() // Limpa o conteúdo do tbody antes de adicionar os novos dados
					
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
	let btnPost = document.querySelector("#post");
	btnPost.addEventListener("click", (e) => {
			//Pega os valores do formulário
			let nome = document.querySelector("#nome").value;
			let altura = document.querySelector("#altura").value;
			let peso = document.querySelector("#peso").value;
			let imc = parseFloat(calculoImc(peso, altura)).toFixed(2);
			let status = statusImc(imc);

			if (verificaDados(nome, peso, altura)) {
					e.preventDefault();
					const url = "https://ifsp.ddns.net/webservices/imc/pessoa";

					let options = {
							method: "POST",
							body: JSON.stringify({
									nome: nome,
									altura: altura,
									peso: peso,
									imc: imc,
									status: status,
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
									limparTabela();
									atualizarTabela();
							})
							.catch(error => console.error("Error:" + error));
			} else {
					e.preventDefault();
					alert("Há campos vazios ou dados inválidos. Peso e Altura precisam ser maiores que 0.");
			}
	});
}

function adicionarPeso(){

	
}

atualizarTabela();
adicionarPessoa();
