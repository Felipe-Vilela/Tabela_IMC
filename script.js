//FUNÇÔES
function calculoImc(peso, altura) {
	let resultado = peso / (altura * altura);

	return resultado;
}

function statusImc(resultadoCalculo){
	let status;
	
	if (resultadoCalculo < 18.50) {
		status = "Magreza";
	}else if (resultadoCalculo >= 18.50 && resultadoCalculo <= 24.99){
		status = "Saudável";
	}else if(resultadoCalculo >= 25.00 && resultadoCalculo <= 29.99){
		status = "Sobrepeso";
	}else if(resultadoCalculo >= 30.00 && resultadoCalculo <= 34.99){
		status = "Obesidade I";
	}else if(resultadoCalculo >= 35.00 && resultadoCalculo <= 39.99){
		status = "Obesidade II";
	}else if (resultadoCalculo >= 40.00){
		status = "Obesidade III";
	}

	return status
}

function verificaDados(nome,peso, altura) {
	if(peso <= 0 || altura <= 0 || nome === "") {
		return false;
	} else {
		return true;
	}
}

function atualizarTabela(){
	const url = "https://ifsp.ddns.net/webservices/imc/pessoa";
	
	fetch(url).then(
		(resposta) => {
			if (!resposta.ok) {
				throw new Error("Falha ao carregar os dados.");
			}
			return resposta.json();
		}).then((dados) => {
			for(let pessoa of dados) {
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
				
				//Adicionando Classes nos btn
				btnExcluir.classList.add("botaos_tabela_excluir");
				btnMaisPeso.classList.add("botaos_tabela", "mais_peso");
				btnMenosPeso.classList.add("botaos_tabela", "menos_peso");
				//Insere os botões das opções na tabela
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

				document.querySelector("tr").append(tdNome);
				document.querySelector("tbody:last-child").append(trPessoa);
				document.querySelector("tbody:last-child").append(tdNome);
				document.querySelector("tbody:last-child").append(tdAltura);
				document.querySelector("tbody:last-child").append(tdPeso);
				document.querySelector("tbody:last-child").append(tdImc);
				document.querySelector("tbody:last-child").append(tdStatus);
				document.querySelector("tbody:last-child").append(tdOpcao);
			}        
		}).catch(error => {
			console.error("Error: " + error);
		});
}	

// function zerarTabela(){
// 	const url = "https://ifsp.ddns.net/webservices/imc/pessoa";
// 	fetch(url).then((resposta) => {
// 		if (!resposta) {
// 			throw new Error("Falha ao carregar os dados.");
// 		}
// 		return resposta.json()
// 	}).then((dados => {
// 		let zerarTabela = document.querySelector("#pessoas-table tbody");
// 		zerarTabela.innerHTML = "";		
// 	})).catch(error => {
// 		console.error("Error: " + error);
// 	});
// }


//Cadastrar - Adicionar nova pessoa no webservice
function adicionarPessoa(){
	let btnPost = document.querySelector("#post");
	btnPost.addEventListener("click", (e) => {
	//Pega os valores do formulário
	let nome = document.querySelector("#nome").value;
	let altura = document.querySelector("#altura").value;
	let peso = document.querySelector("#peso").value;
	let imc = parseFloat(calculoImc(peso, altura)).toFixed(2);
	let status = statusImc(imc);

	if (verificaDados(nome, peso, altura)){
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
				"Content-type" : "application/json"
			}
		}
		fetch(url, options);
		
	}else{
		e.preventDefault();
		alert("Há campos vazios ou dados inválidos. Peso e Altura precisam ser maiores que 0.");
	}
	})
}

atualizarTabela();
adicionarPessoa();



// //Cadastrar - Adicionar os elementos no webservice
// let btnPost = document.querySelector("#post");

// btnPost.addEventListener("click", (e) => {
// 	// Pega os valores do formulário
// 	let nome = document.querySelector("#nome").value;
// 	let peso = document.querySelector("#peso").value;
// 	let altura = document.querySelector("#altura").value;
// 	let imc = parseFloat(calculoImc(peso, altura)).toFixed(2);

// 	if(verificaPesoAltura(nome,peso, altura)) {
// 		e.preventDefault();

// 		let tbody = document.querySelector("tbody");
// 		let tr = document.createElement("tr");
		
// 		let tdNome = document.createElement("td");
// 		let tdPeso = document.createElement("td");
// 		let tdAltura = document.createElement("td");
// 		let tdIMC = document.createElement("td");
// 		let tdStatus = document.createElement("td");
		
// 		let tdOpcao = document.createElement("td");
// 		let btnExcluir = document.createElement("button");
// 		let btnMaisPeso = document.createElement("button");
// 		let btnMenosPeso = document.createElement("button");
		
// 		// Adicionando Classes nos btn
// 		btnExcluir.classList.add("botaos_tabela_excluir");
		
// 		btnMaisPeso.classList.add("botaos_tabela", "mais_peso");
// 		btnMenosPeso.classList.add("botaos_tabela", "menos_peso");
		
// 		// Insere os valores do furmulário nos td
// 		tdNome.innerText = nome;
// 		tdPeso.innerText = parseFloat(peso).toFixed(2)
// 		tdAltura.innerText = parseFloat(altura).toFixed(2);
	
// 		// Insere calculo do IMC e status na tabela
// 		tdIMC.innerText = imc;
// 		tdStatus.innerText = statusImc(imc);
	
// 		// Insere os botões das opções na tabela
// 		btnMaisPeso.innerText = "+ Peso";
// 		btnMenosPeso.innerText = "- Peso";
// 		btnExcluir.innerText = "Excluir";
			
// 		tdOpcao.append(btnMaisPeso);
// 		tdOpcao.append(btnMenosPeso);
// 		tdOpcao.append(btnExcluir);
		
// 		// Insere todos td e tr no tbody
// 		tbody.append(tr);
// 		tr.append(tdNome);
// 		tr.append(tdPeso);
// 		tr.append(tdAltura);
// 		tr.append(tdIMC);
// 		tr.append(tdStatus);
// 		tr.append(tdOpcao);
	
// 		// Evento para os botões da opção
// 		addEventoMaisPeso(btnMaisPeso, tdPeso);
// 		addEventoMenosPeso(btnMenosPeso, tdPeso);
// 		addEventoExcluirLinha(btnExcluir);
		
// 	} else {
// 		e.preventDefault();
// 		alert("Há campos vazios ou dados inválidos. Peso e Altura precisam ser maiores que 0.");
// 	}

// 	// Pega o tbody e cria os td para serem adicionados no tbody
// 	nome = document.querySelector("#nome").value = "";
// 	altura = document.querySelector("#peso").value = "";
//   	peso = document.querySelector("#altura").value = "";
// });

// //Remover da tabela o maior IMC
// let btnRemoverMaiorImc = document.querySelector("#btnRemoverMaiorImc");

// btnRemoverMaiorImc.addEventListener("click", () => {
// 	let tbody = document.querySelector("tbody");
// 	let trs = tbody.children;

// 	let linhaRemover = 0;
// 	let imcs = [];
// 	for(let tr of trs){
// 		let tds = tr.children;
		
// 		let cont = 0;
// 		for (let td of tds) {
// 			if (cont == 3) {
// 				imcs.push(td.innerText);
// 			}
// 			cont++;
// 		}
// 	}

// 	let maior = imcs[0];
// 	for (let i = 0; i < imcs.length; i++) {
// 		if (maior < imcs[i]) {
// 			maior = imcs[i];
// 			linhaRemover = i;
// 		}
// 	}

// 	cont = 0;
// 	for(tr of trs){
// 		if (cont == linhaRemover) {
// 			tr.remove();
// 		}
// 		cont++;
// 	}

// });

// //Remover da tabela o menor IMC
// let btnRemoverMenorImc = document.querySelector("#btnRemoverMenorImc");

// btnRemoverMenorImc.addEventListener("click", () => {
// 	let tbody = document.querySelector("tbody");
// 	let trs = tbody.children;

// 	let linhaRemover = 0;
// 	let imcs = [];
// 	for(let tr of trs){
// 		let tds = tr.children;
		
// 		let cont = 0;
// 		for (let td of tds) {
// 			if (cont == 3) {
// 				imcs.push(td.innerText);
// 			}
// 			cont++;
// 		}
// 	}

// 	let menor = imcs[0];
// 	for (let i = 0; i < imcs.length; i++) {
// 		if (menor > imcs[i]) {
// 			menor = imcs[i];
// 			linhaRemover = i;
// 		}
// 	}

// 	cont = 0;
// 	for(tr of trs){
// 		if (cont == linhaRemover) {
// 			tr.remove();
// 		}
// 		cont++;
// 	}
// });

// function addEventoMaisPeso(btnMaisPeso) {
// 	btnMaisPeso.addEventListener("click", (e) => {
// 		let novoPeso = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
// 		let novaAltura = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
// 		let imc;
// 		let status;
		
// 		novoPeso = parseFloat(novoPeso) + 0.5; // já fazemos o aumento do novo peso aqui
// 		novaAltura = parseFloat(novaAltura);
		
// 		imc = parseFloat(calculoImc(novoPeso, novaAltura)).toFixed(2);
// 		status = statusImc(imc);	

// 		e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText = novoPeso;
// 		e.target.parentElement.previousElementSibling.previousElementSibling.innerText = imc;
// 		e.target.parentElement.previousElementSibling.innerText = status;
// 	});
// }

// function addEventoMenosPeso(btnMenosPeso) {
// 	btnMenosPeso.addEventListener("click", (e) => {
// 		let novoPeso = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
// 		let novaAltura = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
		
// 		novoPeso = parseFloat(novoPeso) - 0.5; // já fazemos o aumento do novo peso aqui
// 		novaAltura = parseFloat(novaAltura);

// 		if(verificaPesoAltura(nome, novoPeso, novaAltura)) {
// 			let imc;
// 			let status;

// 			imc = parseFloat(calculoImc(novoPeso, novaAltura)).toFixed(2);
// 			status = statusImc(imc);
			
// 			e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText = novoPeso;
// 			e.target.parentElement.previousElementSibling.previousElementSibling.innerText = imc;
// 			e.target.parentElement.previousElementSibling.innerText = status;
// 		} else {
// 			alert("Não foi possível remover. Peso precisa ser maior que 0.");
// 		}
// 	});
// }

// function addEventoExcluirLinha(btnExcluir){
// 	btnExcluir.addEventListener("click", (e) =>{
// 		let linhaExcluir = e.target.parentElement.parentElement;

// 		linhaExcluir.remove();
// 	});
	
	
// }