import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import insta from "../../assets/insta.jpg";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/bg5.jpg";
import { Carousel } from "react-responsive-carousel";
import { AuthContext } from "../../context/auth";
import { Router, useRouter } from "next/router";
import Link from "next/link";
function Index() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { forgot, user } = React.useContext(AuthContext);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      await forgot(email);
      console.log("Email Sent");
      router.push('/login')
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000); // after 2 sec remove error
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      console.log("user not present");
    }
  }, [user]);

  return (
    <div className="login-container">
      <div className="carbg">
        <div className="car">
          <Carousel
            autoPlay="true"
            interval={2000}
            infiniteLoop={true}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
          >
            <Image src={bg1} />
            <Image src={bg2} />
            <Image src={bg3} />
            <Image src={bg4} />
            <Image src={bg5} />
          </Carousel>
        </div>
      </div>
      <div>
        <div className="login-card">
          <Image src={insta} />

          <TextField
            size="small"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="dense"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* <TextField
            size="small"
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          /> */}

          {error != "" && <div style={{ color: "red" }}>{error}</div>}

          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "1rem" }}
            component="span"
            onClick={handleClick}
            disabled={loading}
          >
            Send Email
          </Button>

          {/* <div style={{ color: "blue" }}>Forgot Password </div> */}
        </div>
        <div className="bottom-card">
          Don&apos;t have an account ?
          <Link href="/signup">
            <span style={{ color: "blue" }}>SignUp </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
