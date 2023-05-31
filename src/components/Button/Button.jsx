import s from './Button.module.css';
import PropTypes from 'prop-types';
export default function Button({ buttonClick }) {
    return (
        <button className={s.Button} type="button" onClick={buttonClick}>Load more</button>
    );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};
