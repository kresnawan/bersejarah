import { Accordion, AccordionItem } from "@heroui/react";
import useScreenSize from "../hooks/useScreenSize.jsx";

function Question() {
  const { width } = useScreenSize();

  const questions = [
    {
      q: "Pertanyaan 1",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      q: "Pertanyaan 2",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      q: "Pertanyaan 3",
      a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
  ]

  return (
    <Accordion variant="splitted" className="">
      {
        questions.map((item, index) => (
          <AccordionItem key={index} aria-label="Accordion 1" title={item.q} style={{
            maxWidth: 1024,
            width: width - 40
          }}>
            {item.a}
          </AccordionItem>
        ))
      }
    </Accordion>
  );
}

function FAQ() {
  return (
    <div className=' mt-5 max-w-5xl'>
      <Question />
    </div>
  )
}

export default FAQ