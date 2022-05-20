const React = require('react')
const Default = require('./layouts/Default')

function Index({ breads, bakers, title }) {
    return (
        <Default title={title}>
            <h2>Index Page</h2>
          <h3>Bakers</h3>  
          <ul>
                {
                    bakers.map((baker, index) => {
                        return (<li key={index}>
                            <a href={`/bakers/${baker.id}`}>
                                {baker.name}
                            </a>
                        </li>)
                    })
                }
            </ul>
            <div className="newButton">
                <a href="/breads/new"><button>Add a new bread</button></a>
            </div>
<h3>Breads</h3>
            <ul>
                {
                    breads.map((bread, index) => {
                        return (<li key={index}>
                            <a href={`/breads/${bread.id}`}>
                                {bread.getBakedBy()}
                            </a>
                        </li>)
                    })
                }
            </ul>
        </Default>

    )
}

module.exports = Index
