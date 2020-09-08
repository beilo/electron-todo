import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Home.css';
import SettingTime from '../setting/SettingTime';
import Container from '@material-ui/core/Container';

export default function Home(): JSX.Element {
  return (
    <Container maxWidth="sm" style={{ margin: 0, padding: 0 }}>
      <SettingTime />
    </Container>
  );
}
