require 'rubygems'
require 'bundler/setup'

require 'net/http'
require 'uri'
require 'nokogiri'

class LojaController < ApplicationController
  def index
  	@curso = {"titulo" => Array.new , "link" => Array.new, "img" => Array.new}

  	uri = URI.parse('http://api.iobconcursos.com')

	http = Net::HTTP.new(uri.host, uri.port)

	request = Net::HTTP::Post.new(uri.request_uri)
	request.set_form_data({
	                      "nome" => "SEUNOME",
	                      "key"    => "SUAKEY"
	                      })

	request.add_field("Accept", "application/xml")
	request.add_field("Content-Type", "application/x-www-form-urlencoded")

	response = http.request(request)
	# puts response.inspect
	# puts response.body

	reader = Nokogiri::XML(response.body)

	reader.xpath('//cursos/curso/titulo_curso').map do |node|
		@curso['titulo'].push(node.text)
	end
	reader.xpath('//cursos/curso/url_compra').map do |node|
		@curso['link'].push(node.text)
	end
	reader.xpath('//cursos/curso/url_banner_curso').map do |node|
		@curso['img'].push(node.text)
	end

  end
end
