import flask
from slither.slither import Slither
from slither.detectors import all_detectors
import inspect
from slither.detectors.abstract_detector import AbstractDetector
from flask import request
from flask import jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True
# slither = Slither("0x81b7e08f65bdf5648606c89998a9cc8164397647")
# detectors = [getattr(all_detectors, name) for name in dir(all_detectors)]
# detectors = [
#     d for d in detectors if inspect.isclass(d) and issubclass(d, AbstractDetector)
# ]

# for detector_cls in detectors:
#     slither.register_detector(detector_cls)

# results = slither.run_detectors()

# tscores = [x for x in results if x != []]
# print(tscores)


@app.route("/", methods=["GET"])
def home():
    return "hello"


@app.route("/validate", methods=["POST"])
def validate():
    data = request.json
    contractAddress = data["contractAddress"]
    print(contractAddress)
    # print(request)
    try:
        slither = Slither(contractAddress)
        detectors = [getattr(all_detectors, name) for name in dir(all_detectors)]
        detectors = [
            d
            for d in detectors
            if inspect.isclass(d) and issubclass(d, AbstractDetector)
        ]

        for detector_cls in detectors:
            slither.register_detector(detector_cls)

        results = slither.run_detectors()

        tscores = [x for x in results if x != []]
        # print(temp)
        print("hello")

        print(tscores)
        return jsonify(tscores)
    except:
        return ""


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4300)
