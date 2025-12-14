const VALID_EMAIL = 'cypress.test@mail.com';
const VALID_PASSWORD = 'TestPassword1!'; 

describe('Login Form E2E Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173'); 
    });

    it('A) Successful login should navigate to the Success page', () => {
        cy.get('#email').type(VALID_EMAIL);
        cy.get('#password').type(VALID_PASSWORD);
        cy.get('#terms').check();
        cy.get('button[type="submit"]').should('not.be.disabled');
        cy.get('button[type="submit"]').click();
        cy.get('h1').should('contain', 'Giriş Başarılı!');
    });

    describe('B) Handling validation errors and disabled button', () => {
        it('should display one email error and keep the button disabled', () => {
            cy.get('#email').type('invalid-email'); 
            cy.get('button[type="submit"]').should('be.disabled');
            cy.get('.error-message').should('have.length', 1);
            cy.get('.error-message').should('contain', 'Lütfen geçerli bir email adresi girin.');
        });

        it('should display two error messages for invalid email and password', () => {
            cy.get('#email').type('a@b'); 
            cy.get('#password').type('short1A'); 
            cy.get('button[type="submit"]').should('be.disabled');
            cy.get('.error-message').should('have.length', 2);
            cy.get('.error-message').eq(1).should('contain', 'bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter');
        });

        it('should keep the button disabled when only terms are not accepted', () => {
            cy.get('#email').type(VALID_EMAIL); 
            cy.get('#password').type(VALID_PASSWORD); 
            cy.get('.error-message').should('not.exist');
            cy.get('button[type="submit"]').should('be.disabled');
        });
    });
});