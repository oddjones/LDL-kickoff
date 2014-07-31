<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:msxsl="urn:schemas-microsoft-com:xslt"
xmlns:user="urn:my-scripts"
xmlns:umbraco.library="urn:umbraco.library"
exclude-result-prefixes="xsl msxsl user umbraco.library">
 
  <xsl:output method="html" media-type="text/html" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
  doctype-system="DTD/xhtml1-strict.dtd"
  cdata-section-elements="script style"
  indent="yes"
  encoding="utf-8"/>
 
  <xsl:function name="OutputRaw">
		<xsl:param name="html"/>
		<xsl:copy-of select="$html" />
   </xsl:function>
 
  <xsl:param name="records" />
 
  <xsl:template match="/">

	<!-- put form contents into bodytext variable -->

	<xsl:variable name="bodytext">
    <table style="border-collapse:collapse;border:1px solid black;">
          <xsl:for-each select="$records//fields/child::*">
           <tr style="border:1px solid black;">
                  <td valign="top" style="border:1px solid black;padding:5px;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;">
                      <strong>
                       <xsl:value-of select="./caption"/>
                      </strong>
                </td>
                <td valign="top" style="border:1px solid black;padding:5px;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:11px;">
                      <xsl:choose>
                         <xsl:when test="contains(.//value, '/umbraco/plugins/umbracoContour/files/')">
                             <a href="http://{umbraco.library:RequestServerVariables('SERVER_NAME')}{.//value}">
                                 <xsl:value-of select=".//value"/>
                           </a>
                         </xsl:when>
                          <xsl:otherwise>
                              <xsl:for-each select="./values/value">
                                  <xsl:if test="position() &gt; 1">
                                   <br />
                                  </xsl:if>
                                <xsl:value-of select="umbraco.library:ReplaceLineBreaks(.)"/>
                           </xsl:for-each>
                          </xsl:otherwise>
                     </xsl:choose>
                  </td>
            </tr>
        </xsl:for-each>
      </table>
	  </xsl:variable>
	
	  <!-- Get type of form -->
	  
	  <xsl:variable name="callbacktype" select="$records//fields/callbackorescalation//value"/>
	  
	  <xsl:value-of select="umbraco.library:SendMail(
                    'info@umbraco.org',
                    'mike.ranscombe@liverpooldirectlimited.co.uk',
                    $callbacktype, 
                    '\<strong\>bold text here\</strong\>', 
                    'true'
                )"/>

	<xsl:copy-of select="$bodytext" />
 
 </xsl:template>
			
</xsl:stylesheet>