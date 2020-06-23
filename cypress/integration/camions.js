
describe('My First Test', () => {
  it('Test Camions Table', () => {
	cy.visit('http://localhost:3001/')
	
	//Check the presence anywhere in the table
	cy.get('table[name=camions]').contains('td','Honda').should('be.visible')

	//cy.get('table[name=camions] > tbody > tr > td:nth-child(5)').contains('TOURS').should('be.visible')

	cy.get('table[name=camions] > tbody > tr > td:nth-child(4)').contains('AAZZEERRTTYY').should('be.visible')

	cy.get('table[name=camions] > tbody > tr > td:nth-child(3)').contains('2019-01-01').should('be.visible')

	cy.get('table[name=camions] > tbody > tr > td:nth-child(2)').contains('Honda').should('be.visible')

	cy.get('table[name=camions] > tbody > tr > th').contains('1234567890').should('be.visible')


	cy.get('table[name=camions] > tbody > tr td:nth-child(5)').each(($e,index) => {
		const text=$e.text()
		if(text.includes("2019-01-01")) {
			cy.get('table[name=camions] > tbody > tr > td:nth-child(3)').eq(index).then(function(marque)
			{
				const marqueName = marque.text()
				expect(marqueName).to.equal("Honda")
				
			})
		}
	})

  })
})