from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import cv2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model('fl_model.h5')

classes = [
    '1. Eczema 1677', '2. Melanoma 15.75k', '3. Atopic Dermatitis - 1.25k',
    '4. Basal Cell Carcinoma (BCC) 3323', '5. Melanocytic Nevi (NV) - 7970',
    '6. Benign Keratosis-like Lesions (BKL) 2624',
    '7. Psoriasis pictures Lichen Planus and related diseases - 2k',
    '8. Seborrheic Keratoses and other Benign Tumors - 1.8k',
    '9. Tinea Ringworm Candidiasis and other Fungal Infections - 1.7k',
    '10. Warts Molluscum and other Viral Infections - 2103'
]

def preprocess_image(file):
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))
    if img is not None:
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    return None

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "No file part"})
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"})
        if file:
            img_array = preprocess_image(file)
            result = model.predict(img_array)
            predicted_class_index = np.argmax(result, axis=1)[0]
            predicted_class_name = classes[predicted_class_index]
            percentage = round(float(np.max(result)) * 100, 2)
            return jsonify({"result": predicted_class_name, "percentage": percentage})
    return jsonify({"error": "No Prediction"})

if __name__ == '__main__':
    app.run(debug=True)