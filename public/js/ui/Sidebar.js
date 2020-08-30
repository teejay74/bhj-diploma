/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btnMenu = document.querySelector(".sidebar-toggle");
    const mMenu = document.querySelector(".sidebar-mini");
    btnMenu.addEventListener("click", (e) => {
      e.preventDefault();
      mMenu.classList.toggle("sidebar-collapse");
      mMenu.classList.toggle("sidebar-open");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerMenu = document.querySelector(".menu-item_register");
    const loginMenu = document.querySelector(".menu-item_login");
    const logoutMenu = document.querySelector(".menu-item_logout");

    logoutMenu.addEventListener("click", (e) => {
      e.preventDefault();

      User.logout({}, (err, response) => {
        if (response.success) {
          App.setState("init");
          User.unsetCurrent();
        }
      });
    });
    
    loginMenu.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("login").open();
    });

    registerMenu.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("register").open();
    });

    
  }
}