function createUserFriends() {
  const templateUser = `
    <li class="friend-card">
      <a class="user-link-photo user-link-photo-card">
        <img src="../img/icons/icon-profile.png" class="user-photo-post" alt="Foto do perfil">
      </a>
      <div>
        <a>
          <p class="user-name user-friend-name">Nome do Usuário</p>
        </a>
        <p class="language">Javascript, HTML, CSS</p>
        <p class="work">Desenvolvedora Front-End</p>
      </div>
    </li>
  `;
  return templateUser;
}

export function createFriends() {
  const container = document.createElement('main');
  container.setAttribute('id', 'main-container');
  container.innerHTML = `
    <section class="container-internal">
      <input type="search" id="search-name" class="search-input" placeholder="Pesquisar pelo nome" required>
      <ul class="container-internal-list">
        ${createUserFriends()}
      </ul>
    </section>
    `;
  return container;
}