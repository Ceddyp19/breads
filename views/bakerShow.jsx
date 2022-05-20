const React = require('react')
const Default = require('./layouts/Default')

function Show({ baker }) {
    let hasBreads = baker.breads.length != 0
    return (
        <Default>
            <h3>{baker.name}</h3>
            <p>{baker.name} has been baking with us since {baker.startDate.getFullYear()}</p>
            <p>About {baker.name}: {baker.bio}</p>
            {/* Terary statement shows user whether 
            baker has or hasn't baked any breads */}
            {
                hasBreads
                    ?
                    <>
                        <h3>Breads {baker.name} has baked</h3>
                        <ul>
                            {
                                baker.breads.map((bread) => {
                                    return (
                                        <li key={bread.id}>
                                            {bread.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </>
                    :
                    <h3>{baker.name} hasn't baked any breads</h3>
            }
            <form action={`/bakers/${baker.id}?_method=DELETE`} method="POST">
                <input type="submit" value="DELETE" />
            </form>
        </Default>
    )
}

module.exports = Show

