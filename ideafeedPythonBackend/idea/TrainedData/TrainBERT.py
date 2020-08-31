import requests
from sentence_transformers import SentenceTransformer
import pickle
class TrainBERT:

    def __init__(self,data):
        self.data = data



    def createPickleFile(self):
        corpus = []
        for d in self.data:
            corpus.append(d['idea_description'])
        pickle.dump(corpus, open("./corpus", 'wb'))
        embedder = SentenceTransformer('bert-base-nli-mean-tokens')
        corpus_embeddings = embedder.encode(corpus)
        pickle.dump(corpus_embeddings, open("./corpus_embeddings", 'wb'))
        print("Corpus and Embedding created")


def main():
    r = requests.get('http://localhost:3001/feeds/getallfeed')
    ml = TrainBERT(r.json())
    ml.createPickleFile()


if __name__ == "__main__":
    main()