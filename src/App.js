import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function App() {
  const [encodeInput, setEncodeInput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeOrginalWordsInput, setDecodeOrginalWordsInput] = useState("");
  const encode = async () => {
    if (encodeInput !== "") {
      let url = new URL("http://localhost:8000/api/v1/encode"),
        params = {
          sentence: encodeInput,
        };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      await fetch(url, {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          let sentence = JSON.stringify(data["encoded_sentence"]);
          setDecodeInput(sentence.substring(1, sentence.length - 1));
          setDecodeInput(data["encoded_sentence"]);
          setDecodeOrginalWordsInput(data["orginal_words"]);
        });
      setEncodeInput("");
    }
  };

  const decode = async () => {
    let url = new URL("http://localhost:8000/api/v1/decode"),
      params = {
        encoded_sentence: decodeInput,
        orginal_words: decodeOrginalWordsInput,
      };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    if (decodeInput !== "") {
      await fetch(url, {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          setEncodeInput(data["decoded_sentence"]);
        });
      setDecodeInput("");
      setDecodeOrginalWordsInput("");
    }
  };
  return (
    <Container>
      <InputGroup style={{ marginTop: "64px", flexDirection: "column" }}>
        <FormControl
          style={{ width: "100%", whiteSpace: "pre-wrap" }}
          value={encodeInput}
          onInput={(e) => setEncodeInput(e.target.value)}
          as="textarea"
          aria-label="With textarea"
          placeholder="Type your sentence here"
        />
        <Button onClick={encode} variant="outline-secondary">
          Encode
        </Button>
      </InputGroup>
      <InputGroup style={{ marginTop: "64px", flexDirection: "column" }}>
        <FormControl
          style={{ width: "100%", minHeight: "128px" }}
          value={decodeInput}
          onInput={(e) => setDecodeInput(e.target.value)}
          as="textarea"
          aria-label="With textarea"
          placeholder="paste your weird encoded sentence here"
        />
        <FormControl
          style={{ width: "100%" }}
          value={decodeOrginalWordsInput}
          onInput={(e) => setDecodeOrginalWordsInput(e.target.value)}
          as="textarea"
          aria-label="With textarea"
          placeholder="paste your orginal words, separated with space"
        />
        <Button onClick={decode} variant="outline-secondary">
          Decode
        </Button>
      </InputGroup>
    </Container>
  );
}

export default App;
