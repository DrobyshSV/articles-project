export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => cy.request({
  method: 'PUT',
  url: `http://localhost:8000/profile/${profileId}`,
  headers: { Authorization: 'wefw' },
  body: {
    id: '1',
    firstname: 'Siarhei',
    lastname: 'Drobysh',
    age: 33,
    currency: 'BYN',
    country: 'Belarus',
    city: 'Minsk',
    username: 'admin123',
    avatar: 'https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg',
  },
});

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
