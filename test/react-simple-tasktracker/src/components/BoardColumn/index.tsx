import styles from './BoardColumn.module.scss';
import { type FC } from 'react';

type BoardColumnProps = {
  readonly title: string,
};

export const BoardColumn: FC<BoardColumnProps> = ({ title }) => (
  <li className={styles.boardColumn}>
    <p>{title}</p>
    <ul className={styles.boardColumnList}>
      <li>task</li>
    </ul>
    <section>
      <input placeholder='Task title goes here' />
      <button>+Add</button>
    </section>
  </li>
);
