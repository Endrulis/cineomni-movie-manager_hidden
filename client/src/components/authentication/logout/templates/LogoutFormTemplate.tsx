import './sass/LogoutFormTemplate.css';
import {
  Container,
  ButtonGroup,
  Button,
  FormLabel,
  Form,
} from 'react-bootstrap';
interface LogoutFormTemplateProps {
  handleLogout: (event: React.FormEvent<HTMLFormElement>) => void;
  handleGoBackButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const LogoutFormTemplate: React.FC<LogoutFormTemplateProps> = ({
  handleLogout,
  handleGoBackButtonClick,
}) => {
  return (
    <Container className="form-container">
      <Form onSubmit={handleLogout} className="form-container__form">
        <FormLabel as="h3" className="form-container__title">
          Are you sure you want to logout?
        </FormLabel>
        <ButtonGroup className="form-container__buttons">
          <Button
            type="submit"
            className="form-container__button form-container__button-logout bg-red-600"
            variant="danger"
          >
            Logout
          </Button>
          <Button
            type="button"
            onClick={handleGoBackButtonClick}
            className="form-container__button form-container__button-back bg-green-600"
            variant="success"
          >
            Back
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};
