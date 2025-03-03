import { FileInput, JsonInput, SimpleGrid } from '@mantine/core';
import { useState } from 'react';

export const JsonFileLanguageEditor = () => {
  const [json, setJson] = useState<File | null>(null);
  const [value, setValue] = useState('');

  const handleFileChange = (file: File | null) => {
    setJson(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <SimpleGrid cols={2}>
        <FileInput
          label="Input label"
          description="Input description"
          placeholder="Input placeholder"
          value={json}
          maw={300}
          onChange={handleFileChange}
        />
        <JsonInput
          label="Your package.json"
          placeholder="Textarea will autosize to fit the content"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          value={value}
        />
      </SimpleGrid>
    </div>
  );
};
