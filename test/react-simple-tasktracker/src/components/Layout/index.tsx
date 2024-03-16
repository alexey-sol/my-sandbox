import styles from './Layout.module.scss';
import {
  type FC,
  type PropsWithChildren,
} from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <main className={styles.layout}>
    {children}
  </main>
);
