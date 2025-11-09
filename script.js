document.addEventListener('DOMContentLoaded', () => {
            const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
            const botaoTogglePrecos = document.getElementById('toggle-precos');
            const precos = document.querySelectorAll('.preco');
            const listaCarrinho = document.getElementById('carrinho-itens');
            const totalElemento = document.getElementById('carrinho-total');
            const carrinhoPanel = document.getElementById('carrinho-panel');
            const cartIcon = document.getElementById('cart-icon');
            const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
            const descontoMsg = document.getElementById('desconto-msg');
            
            // Eu odiei essa parte porque fiquei semanas tentando entender por que não estava funcionando :) //
            function showToast(mensagem) {
                let toast = document.createElement('div');
                toast.textContent = mensagem;
                toast.style.position = 'fixed';
                toast.style.left = '50%';
                toast.style.bottom = '30px';
                toast.style.transform = 'translateX(-50%)';
                toast.style.background = '#1976d2';
                toast.style.color = '#fff';
                toast.style.padding = '0.8rem 2rem';
                toast.style.borderRadius = '10px';
                toast.style.fontSize = '1.1rem';
                toast.style.boxShadow = '0 2px 20px rgba(33,150,243,0.15)';
                toast.style.zIndex = 9999;
                toast.style.opacity = 1;
                document.body.appendChild(toast);
                setTimeout(() => {
                    toast.style.opacity = 0;
                    setTimeout(() => toast.remove(), 500);
                }, 1500);
            }
            let totalValor = 0.0, itensNoCarrinho = 0;

            botoesAdicionar.forEach(botao => {
                botao.addEventListener('click', (event) => {
                    const card = event.target.closest('.livro-card');
                    const titulo = card.querySelector('h3').textContent;
                    const precoTexto = card.querySelector('.preco').textContent;
                    const precoValor = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

                    showToast(`Livro ${titulo} adicionado!`);
                    const itemLista = document.createElement('li');
                    itemLista.textContent = `${titulo} - ${precoTexto}`;
                    listaCarrinho.appendChild(itemLista);

                    totalValor += precoValor;
                    itensNoCarrinho++;
                    let desconto = 0;
                    if (itensNoCarrinho >= 3) {
                        desconto = totalValor * 0.25;
                        descontoMsg.style.display = "block";
                        descontoMsg.textContent = `Desconto aplicado: R$ ${desconto.toFixed(2).replace('.', ',')}!`;
                    } else {
                        descontoMsg.style.display = "none";
                    }
                    totalElemento.textContent = `Total: R$ ${(totalValor - desconto).toFixed(2).replace('.', ',')}`;
                });
            });
            botaoTogglePrecos.addEventListener('click', () => {
                precos.forEach(preco => preco.classList.toggle('preco-oculto'));
            });
            cartIcon.addEventListener('click', () => {
                carrinhoPanel.classList.add('aberto');
                document.body.style.overflow = 'hidden';
            });
            fecharCarrinhoBtn.addEventListener('click', () => {
                carrinhoPanel.classList.remove('aberto');
                document.body.style.overflow = '';
            });
        });