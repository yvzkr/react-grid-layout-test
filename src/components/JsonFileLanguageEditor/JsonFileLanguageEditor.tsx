import { Button, FileInput, JsonInput, Modal, SimpleGrid } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';

export const JsonFileLanguageEditor = () => {
  const [json, setJson] = useState<File | null>(null);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState(null);
  const [translateAll, setTranslateAll] = useState(false);

  const translateText = async (text, targetLang) => {
    const url = 'https://libretranslate.com/translate';

    try {
      const response = await axios.post(
        url,
        {
          q: text,
          source: 'en',
          target: targetLang,
          format: 'text',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return response.data.translatedText;
    } catch (error) {
      console.error(`Error translating to ${targetLang}:`, error);
      return text; // Fallback to original text if translation fails
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const requestQueue = [];
  let isProcessingQueue = false;

  const processQueue = async () => {
    if (isProcessingQueue) return;
    isProcessingQueue = true;

    while (requestQueue.length > 0) {
      const { text, langCode, resolve } = requestQueue.shift();
      if (!translateAll) {
        setCurrentTranslation({ text, langCode, resolve });
        setShowModal(true);
        await new Promise<void>((resolve) => {
          const interval = setInterval(() => {
            if (!showModal) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      } else {
        const translation = await translateText(text, langCode);
        resolve(translation);
        await delay(3000); // Adjust delay as needed
      }
    }

    isProcessingQueue = false;
  };

  const queueTranslationRequest = (text, langCode) => {
    return new Promise((resolve) => {
      requestQueue.push({ text, langCode, resolve });
      processQueue();
    });
  };

  const addMissingTranslations = async (data) => {
    const updatedData = { ...data };

    // Identify all language codes from the first key
    const firstKey = Object.keys(updatedData)[0];
    const languageCodes = Object.keys(updatedData[firstKey]);

    for (const key in updatedData) {
      if (Object.prototype.hasOwnProperty.call(updatedData, key)) {
        for (const langCode of languageCodes) {
          if (!Object.prototype.hasOwnProperty.call(updatedData[key], langCode)) {
            const translation = await queueTranslationRequest(updatedData[key]['en'], langCode);
            updatedData[key][langCode] = translation;
          }
        }
      }
    }

    return updatedData;
  };

  const handleFileChange = (file: File | null) => {
    setJson(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const jsonData = JSON.parse(e.target?.result as string);
        const updatedJsonData = await addMissingTranslations(jsonData);
        setValue(JSON.stringify(updatedJsonData, null, 2));
      };
      reader.readAsText(file);
    }
  };

  const handleConfirmTranslation = async () => {
    if (currentTranslation) {
      const { text, langCode, resolve } = currentTranslation;
      const translation = await translateText(text, langCode);
      resolve(translation);
      setShowModal(false);
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
      <Button onClick={() => setTranslateAll(true)}>Translate All</Button>
      <Modal opened={showModal} onClose={() => setShowModal(false)} title="Translation Confirmation">
        <div>
          <p>
            Do you want to translate "{currentTranslation?.text}" to "{currentTranslation?.langCode}"?
          </p>
          <Button onClick={handleConfirmTranslation}>Yes</Button>
          <Button onClick={() => setShowModal(false)}>No</Button>
        </div>
      </Modal>
    </div>
  );
};
