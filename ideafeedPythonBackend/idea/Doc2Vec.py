import pickle
import re
from nltk.corpus import stopwords
import sys,os

class Doc2Vec:
    model_file_path = os.path.join(sys.path[0],"idea/doc2vec")
    model = pickle.load(open(model_file_path, 'rb'))
    data = []

    def remove_stop_word(text):
        stops = set(stopwords.words("english"))
        words = [w for w in text.lower().split() if not w in stops]

        final_text = " ".join(words)
        return final_text

    def remove_special_character(final_text):
        final_text = re.sub(r"[^A-Za-z0-9(),!.?\'`]", " ", final_text)
        final_text = re.sub(r"\'s", " 's ", final_text)
        final_text = re.sub(r"\'ve", " 've ", final_text)
        final_text = re.sub(r"n\'t", " 't ", final_text)
        final_text = re.sub(r"\'re", " 're ", final_text)
        final_text = re.sub(r"\'d", " 'd ", final_text)
        final_text = re.sub(r"\'ll", " 'll ", final_text)
        final_text = re.sub(r",", " ", final_text)
        final_text = re.sub(r"\.", " ", final_text)
        final_text = re.sub(r"!", " ", final_text)
        final_text = re.sub(r"\(", " ( ", final_text)
        final_text = re.sub(r"\)", " ) ", final_text)
        final_text = re.sub(r"\?", " ", final_text)
        final_text = re.sub(r"\s{2,}", " ", final_text)
        return final_text

    def train(self, t_data):
        for d in t_data:
            Doc2Vec.data.append(d['idea_description'])

    def predict(self, testdata):
        score = 0
        similar_sentence = None

        test_words = Doc2Vec.remove_stop_word(testdata)
        test_words_v2 = Doc2Vec.remove_special_character(test_words)

        for tdata in Doc2Vec.data:
            compare_words = Doc2Vec.remove_stop_word(tdata)
            compare_words_v2 = Doc2Vec.remove_special_character(compare_words)
            testscore = Doc2Vec.model.wv.n_similarity(test_words_v2.split(), compare_words_v2.split())
            if testscore > 0.5 and testscore > score:
                score = testscore
                similar_sentence = tdata

        print(score)
        return score, similar_sentence
