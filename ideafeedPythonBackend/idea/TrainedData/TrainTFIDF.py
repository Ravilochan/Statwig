import requests
from nltk.tokenize import word_tokenize, sent_tokenize
import gensim
import pickle

class TrainTFIDF:

    def __init__(self,data):
        self.data = data


    def createPickleFile(self):
        print(self.data)
        file_docs = []
        for f in self.data:
            tokens = sent_tokenize(f["idea_headline"])
            for line in tokens:
                file_docs.append(line)
        pickle.dump(file_docs, open("./file_docs", 'wb'))
        print(file_docs)
        print(type(file_docs))
        gen_docs = [[w.lower() for w in word_tokenize(text)]
                    for text in file_docs]
        dictionary = gensim.corpora.Dictionary(gen_docs)
        dictionary.save('dictionary')

        corpus = [dictionary.doc2bow(gen_doc) for gen_doc in gen_docs]
        tf_idf = gensim.models.TfidfModel(corpus)
        tf_idf.save('tf_idf')
        print(tf_idf)
        print(type(tf_idf))
        sims = gensim.similarities.Similarity('.', tf_idf[corpus], num_features=len(dictionary))
        sims.save('sims')
        print(type(sims))



def main():
    r = requests.get('http://localhost:3001/feeds/getallfeed')
    ml = TrainTFIDF(r.json())
    ml.createPickleFile()


if __name__ == "__main__":
    main()






