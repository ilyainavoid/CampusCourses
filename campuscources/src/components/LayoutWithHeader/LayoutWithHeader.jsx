import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout.js";
import HeaderComponent from "../Header/Header.jsx";
import styles from './layout.module.css'

export default function LayoutWithHeader({children}) {
    return (
        <Layout className={styles.layout}>
            <Header>
                <HeaderComponent></HeaderComponent>
            </Header>
            <Content className={styles.content}>
                {children}
            </Content>
            <Footer className={styles.footer}>
                Developed by Ilya Novichkov, {new Date().getFullYear()}
            </Footer>
        </Layout>
    )
}