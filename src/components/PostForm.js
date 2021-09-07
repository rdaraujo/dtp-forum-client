import { withRouter } from 'react-router-dom';

const PostForm = ({ match, location, history }) => {

    const handlePostar = () => {
        // gravar na api
        // limpar os campos do form
        // navegar para home
        history.push('/');
    }

    return <div>
        <h1>Novo Post</h1>
        <div>
            <label htmlFor="titulo">Título: </label>
            <input id="titulo" type="text" />
        </div>
        <div>
            <label htmlFor="autor">Autor: </label>
            <input id="autor" type="text" />
        </div>
        <div>
            <button onClick={handlePostar}>Postar</button>
        </div>
    </div>

}

export default withRouter(PostForm);