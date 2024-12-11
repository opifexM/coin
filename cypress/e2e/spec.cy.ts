describe('Coin.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display login form', () => {
    cy.get('form.login-form').should('exist');
    cy.get('input[name="login"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });

  it('Should show error message for invalid credentials', () => {
    cy.get('input[name="login"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.error #error')
      .should('be.visible')
      .and('contain', 'Client login error: No such user');
  });

  it('Should log in successfully with valid credentials', () => {
    cy.get('input[name="login"]').type('developer');
    cy.get('input[name="password"]').type('skillbox');
    cy.get('button[type="submit"]').click();

    cy.get('.dashboard-component').should('exist');
    cy.get('.dashboard-title').should('contain', 'Accounts');
    cy.get('.dashboard-create-button').should('exist');
  });

  it('Should display a list of accounts after login', () => {
    cy.get('input[name="login"]').type('developer');
    cy.get('input[name="password"]').type('skillbox');
    cy.get('button[type="submit"]').click();

    cy.get('.account-list-component').should('exist');
    cy.get('.account-list-card').should('exist');
    cy.get('.account-card-component').should('have.length.greaterThan', 0);

    cy.get('.account-card-component').first().within(() => {
      cy.get('.account-card-number').should('exist');
      cy.get('.account-card-balance').should('exist');
      cy.get('.account-card-transaction-title').should('exist');
      cy.get('.account-card-transaction').should('exist');
      cy.get('.account-card-open-button').should('exist');
    });
  });

  it('Should create a new account and display it in the list', () => {
    cy.get('input[name="login"]').type('developer');
    cy.get('input[name="password"]').type('skillbox');
    cy.get('button[type="submit"]').click();

    cy.get('.account-card-component').then((accountsBefore) => {
      const initialCount = accountsBefore.length;
      cy.get('.dashboard-create-button').click();
      cy.get('.account-card-component').should('have.length', initialCount + 1);
      cy.get('.account-card-component').last().within(() => {
        cy.get('.account-card-number').should('exist').and('not.be.empty');
        cy.get('.account-card-balance').should('exist');
        cy.get('.account-card-transaction-title').should('exist');
        cy.get('.account-card-transaction').should('exist');
        cy.get('.account-card-open-button').should('exist');
      });
    });
  });

  it('Should transfer funds from the highest balance account to the lower account and back', () => {
    cy.get('input[name="login"]').type('developer');
    cy.get('input[name="password"]').type('skillbox');
    cy.get('button[type="submit"]').click();

    let accountWithBalance = { number: '', balance: 0 };
    let accountWithoutBalance = { number: '', balance: 0 };

    cy.get('.account-card-component').each(($el) => {
      const accountNumber = $el.find('.account-card-number').text();
      const accountBalanceText = $el.find('.account-card-balance').text();
      const accountBalance = parseFloat(accountBalanceText.replace('$', ''));

      if (accountBalance > 0) {
        accountWithBalance = { number: accountNumber.trim(), balance: accountBalance };
      } else {
        accountWithoutBalance = { number: accountNumber.trim(), balance: accountBalance };
      }
    }).then(() => {
      expect(accountWithBalance.number).to.not.be.empty;
      expect(accountWithoutBalance.number).to.not.be.empty;

      cy.get('.account-card-component')
        .contains(accountWithBalance.number)
        .parent()
        .find('.account-card-open-button')
        .click();

      cy.get('form.transfer-form').within(() => {
        cy.get('input[name="recipient"]').type(accountWithoutBalance.number);
        cy.get('input[name="amount"]').type(String(10));
        cy.get('button[type="submit"]').click();
      });
    }).then(() => {
      cy.get('.account-card-component')
        .contains(accountWithoutBalance.number)
        .parent()
        .find('.account-card-open-button')
        .click();

      cy.get('form.transfer-form').within(() => {
        cy.get('input[name="recipient"]').type(accountWithBalance.number);
        cy.get('input[name="amount"]').type(String(10));
        cy.get('button[type="submit"]').click();
      });
    })
  });
});
