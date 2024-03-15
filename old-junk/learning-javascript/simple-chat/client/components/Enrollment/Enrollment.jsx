import Button from "Components/Button/Button";
import Input from "Components/Input/Input";
import styles from "./Enrollment.module.css";

// A component which is rendered for a newcomers. Asks for entering a username.

const Enrollment = (props) => (
  <form
    className={ styles.Enrollment }
    onSubmit={ props.registerUser }
  >
    <Input
      name="username"
      placeholder="Please type your name in"
      style={{ width: "200px" }}
    />
    <Button
      style={{ marginLeft: "10px" }}
      type="submit"
    >
      Confirm!
    </Button>
  </form>
);

export default Enrollment;