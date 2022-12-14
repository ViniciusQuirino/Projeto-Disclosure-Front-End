import { Link } from "react-router-dom";
import { AiOutlineCar } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { TfiPaintRoller } from "react-icons/tfi";

import { DefaultServicesBox } from "./style";
import { Container } from "../../../styles/global";

const DefaultServices = () => {
  return (
    <>
      <Container>
        <DefaultServicesBox>
          <h2>
            Aqui você encontra os <span>melhores</span> serviços
          </h2>
          <li>
            <GoHome className="homeIcon" />
            <p>
              <span>Imóveis</span>
            </p>
            <p>Casas, apartamentos, prédios</p>
          </li>
          <li>
            <BsCoin className="coinIcon" />
            <p>
              <span>Finanças</span>
            </p>
            <p>Banco, consultoria, empreendedorismo</p>
          </li>
          <li>
            <AiOutlineCar className="carIcon" />
            <p>
              <span>Peças</span>
            </p>
            <p>Automóveis, motocicletas</p>
          </li>
          <li>
            <TfiPaintRoller className="paintIcon" />
            <p>
              <span>Serviços</span>
            </p>
            <p>Mão de obra em geral</p>
          </li>
          <Link to="/login">Quero contratar um serviço</Link>
        </DefaultServicesBox>
      </Container>
    </>
  );
};

export default DefaultServices;
