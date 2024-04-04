<?php

class ChatGTP {

	protected $api_key='';

	protected $model='';

	protected $endpoint='';

	protected int $max_tokens=50;

	protected float $temperature=0.7;

	protected array $response=[];

	public function __construct(string $api_key, string $model='', string $endpoint='') {
		if ($endpoint==='') {
			$endpoint='https://api.openai.com/v1/chat/completions';
		}
		$this->setEndpoint($endpoint);

		if ($model==='') {
			$model='gpt-4';
		}
		$this->setModel($model);

		$this->setApiKey($api_key);
	}

	public function setApiKey($api_key):self {
		$this->api_key=$api_key;

		return $this;
	}

	public function getApiKey() {
		return $this->api_key;
	}

	public function setEndpoint($endpoint):self {
		$this->endpoint=$endpoint;

		return $this;
	}

	public function getEndpoint() {
		return $this->endpoint;
	}

	public function setModel($model):self {
		$this->model=$model;

		return $this;
	}

	public function getModel() {
		return $this->model;
	}

	public function setMaxTokens(int $max_tokens):self {
		$this->max_tokens=$max_tokens;

		return $this;
	}

	public function getMaxTokens() {
		return $this->max_tokens;
	}

	public function setTemperature(float $temperature):self {
		$this->temperature=$temperature;

		return $this;
	}

	public function getTemperature() {
		return $this->temperature;
	}

	public function setResponse(array $response):self {
		$this->response=$response;

		return $this;
	}

	public function getResponse() {
		return $this->response;
	}

	public function send(array $messages):bool {
		$ch=curl_init($this->getEndpoint());
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["model"=>$this->getModel(), "messages"=>$messages, "max_tokens"=>$this->getMaxTokens(), "temperature"=>$this->getTemperature(),]));
		curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json", "Authorization: Bearer {$this->getApiKey()}"]);

		$response=curl_exec($ch);
		curl_close($ch);

		var_dump($response);

		if ($response===false) {
			return false;
		} else {
			$responseArray=json_decode($response, true);
			if (($responseArray!==null)&&(isset($responseArray["choices"][0]["text"]))) {
				$this->setResponse($responseArray);

				return true;
			}

			return false;
		}
	}

}

$messages=[
	[
		"role"=> "system",
		"content"=> "Du bist Übersetzer in den Muttersprachen Deutsch und Englisch. Übersetze den folgenden Text auf Englisch."
	],
	[
		"role"=> "user",
		"content"=> "Hallo, ich möchte eine Webseite bei euch mieten. Es soll ein Baukasten sein und in Worms gehostet sein."
	]
];

$api_key="";
$request=new ChatGTP($api_key);

if ($request->send($messages)) {
	$response=$request->getResponse();
	var_dump($response);
} else {
	die('error');
}
?>