import styled from "@emotion/styled";

export const Container = styled.div({
  display: "flex",
  width: "710px",
  height: "80px",
  marginRight: "30px",
  borderRadius: "4px",
  border: "solid 1.5px #273e54",
  backgroundColor: "#192e44"
});

export const Question = styled.div({
  //display: "inline-block",
  // marginLeft: "10px",
  // marginRight: "192px",
  margin: "26px 212px 26px 16px",
  //marginBottom: "26px",
  width: "426px",
  height: "28px",
  opacity: "90%",
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.5px",
  letterSpacing: "0.15px",
  color: "white"
});

export const Img = styled.img({
  marginTop: "20px",
  marginLeft: "20px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundImage:
    "linear-gradient(to bottom, rgba(238, 238, 238, 0), rgba(0, 0, 0, 0.8) 100%)"
});
