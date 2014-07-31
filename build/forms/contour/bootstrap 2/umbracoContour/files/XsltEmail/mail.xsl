<?xml version="1.0" encoding="utf-8" ?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:user="urn:my-scripts" xmlns:umbraco.library="urn:umbraco.library" exclude-result-prefixes="xsl msxsl user umbraco.library">
    <xsl:output method="html" media-type="text/html" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" doctype-system="DTD/xhtml1-strict.dtd" cdata-section-elements="script style" indent="yes" encoding="utf-8" /> 
    <xsl:param name="records" /> 
    <xsl:template match="/">

        <!--Read Dropdown List Value into variable -->
        <xsl:variable name="dropdownlistValue" select="$records//fields/callbackorescalation//value"/>

        <!-- Read form contents into a variable ready for sending -->
        <xsl:variable name="bodyText">
            <xsl:for-each select="$records//fields/child::*">
                <strong><xsl:value-of select="./caption" />: </strong><xsl:value-of select=".//value" />&lt;br /&gt;&lt;br /&gt;
            </xsl:for-each>
        </xsl:variable>

        <!-- Send email -->
        <xsl:choose>
            <xsl:when test="$dropdownlistValue = 'Call back'">
                <xsl:value-of select="umbraco.library:SendMail(
                    'test@liverpool.gov.uk',
                    'mike.ranscombe@liverpooldirectlimited.co.uk',
                    'Call Back', 
                    $body, 
                    'true'
                )"/>
            </xsl:when>
            <xsl:when test="$dropdownlistValue = 'Escalation'">
                <xsl:value-of select="umbraco.library:SendMail(
                    'test@liverpool.gov.uk',
                    'mike.ranscombe@liverpooldirectlimited.co.uk',
                    'Escalation', 
                    $body, 
                    'true'
                )"/>
            </xsl:when>
        </xsl:choose>

        <!-- A reminder for yourself -->
        <p>Lifestyles form submitted!</p>

    </xsl:template>
</xsl:stylesheet>