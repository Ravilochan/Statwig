from sentence_transformers import SentenceTransformer
import scipy.spatial
import pickle,os
import requests
from .constants import BASE_URL


class BERT:
    embedder = SentenceTransformer('bert-base-nli-mean-tokens')
    corpus_embeddings = None
    corpus = None

    def train(self, data):
        print("In BERT train")
        training_data = []
        for d in data:
            training_data.append(d['idea_description'])
        BERT.corpus = training_data
        BERT.corpus_embeddings = BERT.embedder.encode(BERT.corpus)

    def predict(self, queries, closest_n):
        cwd = os.getcwd()
        corpuspath = cwd + '/idea/TrainedData/corpus'
        BERT.corpus = pickle.load(open(corpuspath, 'rb'))

        corpusembeddingpath = cwd + '/idea/TrainedData/corpus_embeddings'
        BERT.corpus_embeddings  = pickle.load(open(corpusembeddingpath, 'rb'))

        query_list = [queries]
        score = 0
        similar_sentence = None
        query_embeddings = BERT.embedder.encode(query_list)
        for query, query_embedding in zip(queries, query_embeddings):
            distances = scipy.spatial.distance.cdist([query_embedding], BERT.corpus_embeddings, "cosine")[0]
            results = zip(range(len(distances)), distances)
            results = sorted(results, key=lambda x: x[1])

            for idx, distance in results[0:closest_n]:
                similar_sentence = BERT.corpus[idx].strip()
                score = 1 - distance
                # print(BERT.corpus[idx].strip(), "(Score: %.4f)" % (1 - distance))

        print("similar_sentence",similar_sentence," score ",score)
        return similar_sentence, score
