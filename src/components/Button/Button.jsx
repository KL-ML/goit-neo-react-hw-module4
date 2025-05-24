import PropTypes from 'prop-types';

import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({
  text,
  variant,
  tabletDisplay,
  green,
  red,
  addContact,
  icon: Icon,
  iconSize,
  btnType,
  handleLoadMoreClick
}) {
  return (
    <>
      <button
        type={btnType}
        onClick={handleLoadMoreClick}
        className={clsx(
          css.button,
          css[variant],
          tabletDisplay && css.tabletDisplay,
          green && css.green,
          red && css.red,
          addContact && css.addContact
        )}
      >
        {Icon && <Icon size={iconSize} />}
        {text}
      </button>
    </>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
};
