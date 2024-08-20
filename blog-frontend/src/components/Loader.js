import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return(
        <div className="full-screen-loader">
        <Spinner animation="border" role="status" variant="warning">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
    )
}

export default Loader;